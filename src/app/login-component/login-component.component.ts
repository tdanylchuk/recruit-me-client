import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../shared/authorization/authorization-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  credentials = {username: '', password: ''};

  constructor(private authorizationService: AuthorizationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.authorizationService.authenticate(this.credentials, () => {
      this.router.navigateByUrl(this.authorizationService.redirectUrl);
    });
  }
}
