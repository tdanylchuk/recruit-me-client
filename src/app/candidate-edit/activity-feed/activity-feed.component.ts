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

  typeMapping = new Map([
    ['CANDIDATE_COMMENT_ADDED', {message: 'added comment', icon: 'send'}],
    ['CANDIDATE_ADDED', {message: 'added candidate', icon: 'person_add'}],
    ['CANDIDATE_EDITED', {message: 'edited candidate', icon: 'edit'}],
    ['CANDIDATE_DELETED', {message: 'deleted candidate', icon: 'delete'}],
    ['CANDIDATE_ATTACHMENT_ADDED', {message: 'added attachment', icon: 'attach_file'}],
    ['CANDIDATE_ATTACHMENT_DELETED', {message: 'deleted attachment', icon: 'delete'}]
  ]);

  constructor(private activityService: ActivityService) {
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

  getMessage(activityType: string): any {
    let props = this.typeMapping.get(activityType);
    return props == undefined ? "undefined" : props.message;
  }

  getIcon(activityType: string): any {
    let props = this.typeMapping.get(activityType);
    return props == undefined ? "wb_sunny" : props.icon;
  }

}
