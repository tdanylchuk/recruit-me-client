import {Component, OnInit} from '@angular/core';
import {of, Subscription} from 'rxjs';
import {UserService} from "../../shared/user/user.service";
import {ActivatedRoute} from "@angular/router";
import {StorageService} from "../../shared/storage/storage.service";
import {ActivityService} from "../../shared/activity/activity.service";
import {flatMap, map} from 'rxjs/operators';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any = {};
  sub: Subscription;
  activities: any;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              public activityService: ActivityService) {
  }

  ngOnInit() {
    this.sub = this.route.params.pipe(
      map(params => {
        return params['id'];
      }),
      flatMap(userId => {
        if (userId) {
          return this.userService.get(userId);
        } else {
          return of(StorageService.getUser());
        }
      }),
      flatMap(user => {
        this.user = user;
        return this.activityService.getByAuthor(this.user.id);
      })
    ).subscribe(data => {
      this.activities = data._embedded.activityEntities;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
