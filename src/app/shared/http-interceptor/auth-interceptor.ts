import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    if (req.url.indexOf(environment.apiRoot) === 0) {
      if (req.url.startsWith(environment.apiRoot)) {
        authReq = req.clone({withCredentials: true});
      }
      return next.handle(authReq);
    }
  }
}
