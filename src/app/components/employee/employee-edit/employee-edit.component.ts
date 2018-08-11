import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MatSnackBar} from "@angular/material";
import {EmployeeService} from "../../../shared/employee/employee.service";

@Component({
  selector: 'employee-edit-component',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  @Input('employee')
  employee: any;
  @Input('dataChangedEmitter')
  dataChangedEmitter: EventEmitter<any>;

  constructor(private employeeService: EmployeeService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  save(form: NgForm) {
    this.employeeService.save(form).subscribe(result => {
      this.dataChangedEmitter.emit(result.id);
      this.showSnackBar(`Employee has been saved.`);
    }, error => this.showSnackBar(`Cannot save employee. ${error.message}`));
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

}
