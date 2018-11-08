import {Component, Input} from '@angular/core';
import {CompensationService} from "../../../shared/compensation/compensation.service";
import {CompensationDialog} from "./compensation-dialog/compensation-dialog";
import {MatDialog} from "@angular/material";
import {flatMap, map} from 'rxjs/operators';
import {Observable} from "rxjs";

@Component({
  selector: 'compensation-component',
  templateUrl: './compensation.component.html',
  styleUrls: ['./compensation.component.css']
})
export class CompensationComponent {

  compensationCategories: any;
  compensationsPerCategory: Map<any, [any]>;
  compensations: any;
  limits: any;
  selectedTable = 'List';

  @Input('employee')
  employee: any;

  constructor(private compensationService: CompensationService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.compensationService.getAllCategories().pipe(
      map(data => {
        this.compensationCategories = data._embedded.compensationCategoryEntities;
      }),
      flatMap(data => {
        return this.loadCompensations();
      })
    ).subscribe();
  }

  loadCompensations(): Observable<any> {
    return this.compensationService.getTargetCompensations(this.employee.id).pipe(
      map(data => {
        this.compensations = data._embedded.compensationEntities;
        this.compensationsPerCategory = this.compensations.reduce((map, compensation) => {
          let list = map[compensation.category];
          if (list == null) {
            list = [];
            map[compensation.category] = list;
          }
          map[compensation.category].push(compensation);
          return map;
        }, {});
        this.limits = this.getLimits();
      }));
  }

  getLimits(): any {
    return this.compensationCategories.map((categoryObject) => {
      return {
        'limit': this.getLimitForCategory(categoryObject),
        'compensated': this.getTotalCompensations(categoryObject.category),
        'category': categoryObject.category
      }
    });
  }

  private getLimitForCategory(categoryObject) {
    let foundLimit = categoryObject.gradationLimits.find(limit => limit.grade == this.employee.grade);
    if (foundLimit == null) {
      foundLimit = categoryObject.gradationLimits.find(limit => limit.grade == 'default');
    }
    return foundLimit.limit;
  }

  getTotalCompensations(category) {
    if (!this.compensationsPerCategory || !this.compensationsPerCategory[category]) {
      return 0;
    }
    return this.compensationsPerCategory[category]
      .map(compensation => compensation.amount)
      .reduce((sum, amount) => sum + amount);
  }

  selectTable(table) {
    this.selectedTable = table;
  }

  addCompensation() {
    const dialogRef = this.dialog.open(CompensationDialog, {
      data: this.compensationCategories
    });

    dialogRef.afterClosed().pipe(
      flatMap(result => {
        result.employeeId = this.employee.id;
        return this.compensationService.saveCompensations(result);
      }),
      flatMap(result => {
        return this.loadCompensations();
      })
    ).subscribe();
  }

}
