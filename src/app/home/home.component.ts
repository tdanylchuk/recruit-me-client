import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../shared/authorization/authorization-service.service";

@Component({
  selector: 'app-main',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: string = '';

  constructor(public authorizationService: AuthorizationService) {
    this.username = authorizationService.getUsername();
  }

  ngOnInit() {
  }

}
