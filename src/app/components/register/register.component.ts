import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../../shared/authorization/authorization-service.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userDetails = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };

  hidePassword = true;
  hideRepeatPassword = true;

  constructor(private authorizationService: AuthorizationService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (this.authorizationService.isAuthenticated()) {
      this.router.navigateByUrl("/home");
    }
  }

  register() {
    this.authorizationService.register(this.userDetails).subscribe(() => {
      this.snackBar.open(`User [${this.userDetails.email}] has been registered.`, null, {
        duration: 2000,
      });
      this.router.navigateByUrl("/login");
    })
  }

}
