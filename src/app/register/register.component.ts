import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../shared/authorization/authorization-service.service";
import {Router} from "@angular/router";

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
              private router: Router) {
  }

  ngOnInit() {
    if (this.authorizationService.isAuthenticated()) {
      this.router.navigateByUrl("/home");
    }
  }

  register() {
    this.authorizationService.register(this.userDetails).subscribe(() => {
      this.router.navigateByUrl("/login");
    })
  }


}
