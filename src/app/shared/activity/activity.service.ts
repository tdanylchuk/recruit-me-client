import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable()
export class ActivityService {

  private ACTIVITY_API = environment.apiRoot + '/activities';

  constructor(private http: HttpClient) {
  }

  getByTarget(targetId): Observable<any> {
    return this.http.get(`${this.ACTIVITY_API}/search/findByTargetId?targetId=${targetId}`)
  }

}
