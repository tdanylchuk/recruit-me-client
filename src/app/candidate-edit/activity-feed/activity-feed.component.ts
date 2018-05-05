import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {ActivityService} from "../../shared/activity/activity.service";

@Component({
  selector: 'activity-feed-component',
  templateUrl: './activity-feed.component.html',
  styleUrls: ['./activity-feed.component.css']
})
export class ActivityFeedComponent implements OnInit {

  @Input('candidate')
  candidate: any;

  @Input('dataChangedEmitter')
  dataChangedEmitter: EventEmitter<any>;

  activities: any;

  constructor(public activityService: ActivityService) {
  }

  ngOnInit() {
    this.init();
    this.dataChangedEmitter.subscribe(() => {
      this.init();
    })
  }

  private init() {
    this.activityService.getByTarget(this.candidate.id).subscribe(data => {
      this.activities = data._embedded.activityEntities;
    });
  }

}
