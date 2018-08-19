import {Component, Input} from '@angular/core';
import {CompensationService} from "../../../shared/compensation/compensation.service";
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'compensation-component',
  templateUrl: './compensation.component.html',
  styleUrls: ['./compensation.component.css']
})
export class CompensationComponent {

  compensationCategories: any;
  compensationsPerCategory: Map<any, [any]>;

  @Input('employee')
  employee: any;

  constructor(private compensationService: CompensationService) {
  }

  ngOnInit() {
    this.compensationService.getAllCategories().subscribe(data => {
      this.compensationCategories = data._embedded.compensationCategoryEntities;
    });
    this.compensationService.getTargetCompensations(this.employee.id).subscribe(data => {
      const compensations = data._embedded.compensationEntities;
      this.compensationsPerCategory = compensations.reduce((map, compensation) => {
        let list = map[compensation.category];
        if (list == null) {
          list = [];
          map[compensation.category] = list;
        }
        map[compensation.category].push(compensation);
        return map;
      }, {});
    });
  }

  getCompensationDS(category): MatTableDataSource<any> {
    const ds = this.compensationsPerCategory[category] ? this.compensationsPerCategory[category] : [];
    return new MatTableDataSource(ds);
  }

  getCategoryLimit(category): any {
    if (this.compensationCategories == null) {
      return 0;
    }
    const foundCategory = this.compensationCategories.find(compensationCategory => compensationCategory.category == category);
    let foundLimit = foundCategory.gradationLimits.find(limit => limit.grade == this.employee.grade);
    if (foundLimit == null) {
      foundLimit = foundCategory.gradationLimits.find(limit => limit.grade == 'default');
    }
    return foundLimit.limit;
  }

  getTotalCompensations(category) {
    if (this.compensationsPerCategory == null) {
      return 0;
    }
    return this.compensationsPerCategory[category]
      .map(compensation => compensation.amount)
      .reduce((sum, amount) => sum + amount);
  }
}
