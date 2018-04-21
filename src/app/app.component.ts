import {Component} from '@angular/core';
import {AuthorizationService} from "./shared/authorization/authorization-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Home';

  constructor(public authorizationService: AuthorizationService,
              private router: Router) {
  }

  logout() {
    this.authorizationService.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
    })
  }
}
