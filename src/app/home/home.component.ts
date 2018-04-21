import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../shared/authorization/authorization-service.service";

@Component({
  selector: 'app-main',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;

  constructor(public authorizationService: AuthorizationService) {
    this.user.username = authorizationService.getUsername();
    console.info(this.user);
  }

  ngOnInit() {
  }

}
