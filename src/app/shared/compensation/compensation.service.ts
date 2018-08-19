import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable()
export class CompensationService {

  constructor(private http: HttpClient) {
  }

  private COMPENSATION_CATEGORIES_API = environment.apiRoot + '/compensationCategories';
  private COMPENSATIONS_API = environment.apiRoot + '/compensations';

  getAllCategories(): Observable<any> {
    return this.http.get(this.COMPENSATION_CATEGORIES_API);
  }

  getTargetCompensations(targetId): Observable<any> {
    return this.http.get(this.COMPENSATIONS_API + "/search/findByEmployeeId", {params: {"employeeId": targetId}});
  }

}
