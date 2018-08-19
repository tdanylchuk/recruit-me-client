import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../../shared/authorization/authorization-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    username: '',
    password: ''
  };
  errorMessage: string;

  hidePassword = true;

  constructor(private authorizationService: AuthorizationService,
              private router: Router) {
  }

  ngOnInit() {
    this.redirectIfAuthenticated();
  }

  login() {
    this.redirectIfAuthenticated();

    this.authorizationService.authenticate(this.credentials, () => {
      this.router.navigateByUrl(this.authorizationService.redirectUrl);
    }, error => {
      this.errorMessage = 'Invalid credentials';
    });
  }

  private redirectIfAuthenticated() {
    if (this.authorizationService.isAuthenticated()) {
      this.router.navigateByUrl("/home");
    }
  }

  resetErrorMessage() {
    this.errorMessage = null
  }
}
