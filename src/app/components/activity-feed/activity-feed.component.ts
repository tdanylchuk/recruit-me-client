import {Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivityService} from "../../shared/activity/activity.service";
import {Subscription} from "rxjs";
import {TargetType} from "../../shared/target.type";

@Component({
  selector: 'activity-feed-component',
  templateUrl: './activity-feed.component.html',
  styleUrls: ['./activity-feed.component.css']
})
export class ActivityFeedComponent implements OnInit, OnDestroy {

  @Input('targetId')
  targetId: number;
  @Input('targetType')
  targetType: string;

  @Input('dataChangedEmitter')
  dataChangedEmitter: EventEmitter<any>;

  activities: any;

  sub: Subscription;

  constructor(public activityService: ActivityService) {
  }

  ngOnInit() {
    this.init();
    this.sub = this.dataChangedEmitter.subscribe(() => {
      this.init();
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private init() {
    this.activityService.getByTarget(this.targetId, this.targetType).subscribe(data => {
      this.activities = data._embedded.activityEntities;
    });
  }

}
