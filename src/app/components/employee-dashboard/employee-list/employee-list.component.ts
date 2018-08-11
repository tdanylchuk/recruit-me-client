import {Component, OnInit} from '@angular/core';
import {MatSnackBar, MatTableDataSource} from "@angular/material";
import {AttachmentService} from "../../../shared/attachments/attachment.service";
import {EmployeeService} from "../../../shared/employee/employee.service";

@Component({
  selector: 'employees-list-component',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeesDS = new MatTableDataSource();

  columnsToDisplay: Array<any> = ["id", "name", "email", "position"];

  constructor(private employeesService: EmployeeService,
              private attachmentService: AttachmentService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.init();
  }

  private init() {
    this.employeesService.getAll().subscribe(data => {
      this.employeesDS.data = data._embedded.employeeEntities;
    });
  }

  deleteUser(employee: any) {
    this.employeesService.remove(employee._links.self.href).subscribe(() => {
      const index = this.employeesDS.data.indexOf(employee);
      this.employeesDS.data.splice(index, 1);
      this.employeesDS._updateChangeSubscription();
      this.showSnackBar("employee has been removed");
    }, error => console.error(error));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.employeesDS.filter = filterValue;
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 1000,
    });
  }
}
