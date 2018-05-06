import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {StorageService} from "../storage/storage.service";
import {finalize} from 'rxjs/operators';


@Injectable()
export class AuthorizationService {

  constructor(private http: HttpClient) {
  }

  redirectUrl: string = '/';

  private LOGOUT_API = environment.apiRoot + '/logout';
  private REGISTRATION_API = environment.apiRoot + '/register';
  private USER_API = environment.apiRoot + '/user';

  logout(): Observable<any> {
    return this.http.post(this.LOGOUT_API, {}).pipe(
      finalize(() => {
        StorageService.deleteUser();
      }));
  }

  authenticate(credentials, callback, errorCallback) {
    const httpOptions = {
      headers: new HttpHeaders(credentials ? {
        Authorization: `Basic ${btoa(credentials.username + ':' + credentials.password)}`
      } : {})
    };

    this.http.get(this.USER_API, httpOptions).subscribe(response => {
      const userDetails = (response as any).principal;
      StorageService.saveUser(userDetails);
      return callback && callback();
    }, error => {
      return errorCallback && errorCallback(error);
    });
  }

  register(userDetails: any): Observable<any> {
    return this.http.post(this.REGISTRATION_API, userDetails);
  }

  isAuthenticated(): boolean {
    return !!StorageService.getUser()
  }

}
