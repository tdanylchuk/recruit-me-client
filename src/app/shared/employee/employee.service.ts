import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  private EMPLOYEE_API = environment.apiRoot + '/employees';

  getAll(): Observable<any> {
    return this.http.get(this.EMPLOYEE_API);
  }

  get(id: string) {
    return this.http.get(this.EMPLOYEE_API + '/' + id);
  }

  save(employee: any): Observable<any> {
    let result: Observable<Object>;
    if (employee['href']) {
      result = this.http.put(employee.href, employee);
    } else {
      result = this.http.post(this.EMPLOYEE_API, employee);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }

  addAttachments(employeeId, attachmentIds: any): Observable<any> {
    return this.http.post(`${this.EMPLOYEE_API}/${employeeId}/attachments`, attachmentIds,
      {headers: {'Content-Type': 'application/json'}});
  }

}
