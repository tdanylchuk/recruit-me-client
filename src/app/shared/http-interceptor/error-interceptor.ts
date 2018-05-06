import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

import {Router} from "@angular/router";
import {AuthorizationService} from "../authorization/authorization-service.service";
import {StorageService} from "../storage/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private authService: AuthorizationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401) {
            this.authService.redirectUrl = this.router.url;
            StorageService.deleteUser();
            this.router.navigate(['/login']);
          }
        }
      }));
  }
}
