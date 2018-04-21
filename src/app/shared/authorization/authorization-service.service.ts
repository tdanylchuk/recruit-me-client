import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/add/operator/finally';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Observable";


@Injectable()
export class AuthorizationService {

  constructor(private http: HttpClient) {
  }

  redirectUrl: string = '/';
  username: string;

  private LOGOUT_API = environment.apiRoot + '/logout';
  private REGISTRATION_API = environment.apiRoot + '/registration';
  private USER_API = environment.apiRoot + '/user';

  logout(): Observable<any> {
    return this.http.post(this.LOGOUT_API, {}).finally(() => {
      !!localStorage.removeItem("user")
    });
  }

  authenticate(credentials, callback) {
    const httpOptions = {
      headers: new HttpHeaders(credentials ? {
        Authorization: `Basic ${btoa(credentials.username + ':' + credentials.password)}`
      } : {})
    };

    this.http.get(this.USER_API, httpOptions).subscribe(response => {
      localStorage.setItem("user", response as string);
      this.username = (response as any).name;
      return callback && callback();
    });
  }

  getUsername(): any {
    return this.username ? this.username : "undefined";
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("user")
  }

}
