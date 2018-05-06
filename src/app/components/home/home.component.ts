import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../../shared/authorization/authorization-service.service";
import {StorageService} from "../../shared/storage/storage.service";

@Component({
  selector: 'app-main',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;

  constructor(public authorizationService: AuthorizationService) {
  }

  ngOnInit() {
    this.user = StorageService.getUser();
  }

}
