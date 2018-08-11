import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {EmployeeService} from "../../../shared/employee/employee.service";

@Component({
  selector: 'employee-add-component',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  employee: any = {};

  constructor(private employeeService: EmployeeService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
  }

  save(form: NgForm) {
    this.employeeService.save(form).subscribe(result => {
      this.showSnackBar(`Employee has been saved.`);
      this.router.navigate(['/employee', result.id])
    }, error => this.showSnackBar(`Cannot save employee. ${error.message}`));
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }
}
