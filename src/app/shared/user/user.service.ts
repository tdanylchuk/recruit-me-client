import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService {

  private USERS_API = environment.apiRoot + '/users';

  constructor(private http: HttpClient) {
  }

  get(userId): Observable<any> {
    return this.http.get(`${this.USERS_API}/${userId}`)
  }

}
