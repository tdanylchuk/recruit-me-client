import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable()
export class ActivityService {

  private ACTIVITY_API = environment.apiRoot + '/activities';

  private typeMapping = new Map([
    ['CANDIDATE_COMMENT_ADDED', {message: 'added comment', icon: 'send'}],
    ['CANDIDATE_ADDED', {message: 'added candidate', icon: 'person_add'}],
    ['CANDIDATE_EDITED', {message: 'edited candidate', icon: 'edit'}],
    ['CANDIDATE_DELETED', {message: 'deleted candidate', icon: 'delete'}],
    ['CANDIDATE_ATTACHMENT_ADDED', {message: 'added attachment', icon: 'attach_file'}],
    ['CANDIDATE_ATTACHMENT_DELETED', {message: 'deleted attachment', icon: 'delete'}]
  ]);

  constructor(private http: HttpClient) {
  }

  getByTarget(targetId): Observable<any> {
    return this.http.get(`${this.ACTIVITY_API}/search/findByTargetId?targetId=${targetId}`)
  }

  getByAuthor(userId): Observable<any> {
    return this.http.get(`${this.ACTIVITY_API}/search/findByAuthorId?authorId=${userId}`)
  }

  getMessage(activityType: string): string {
    let props = this.getMapping(activityType);
    return props == undefined ? "undefined" : props.message;
  }

  getIcon(activityType: string): string {
    let props = this.getMapping(activityType);
    return props == undefined ? "wb_sunny" : props.icon;
  }

  private getMapping(type: string): any {
    return this.typeMapping.get(type);
  }

}
