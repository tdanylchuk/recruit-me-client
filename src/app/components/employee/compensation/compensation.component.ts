import {Component, Input} from '@angular/core';
import {CompensationService} from "../../../shared/compensation/compensation.service";

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
  selectedTable = 'Compensations';

  @Input('employee')
  employee: any;

  constructor(private compensationService: CompensationService) {
  }

  ngOnInit() {
    this.compensationService.getAllCategories().subscribe(data => {
      this.compensationCategories = data._embedded.compensationCategoryEntities;
      this.compensationService.getTargetCompensations(this.employee.id).subscribe(data => {
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
      });
    });
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

}
