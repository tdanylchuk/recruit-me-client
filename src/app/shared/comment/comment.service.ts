import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class CommentService {

  private COMMENTS_API = environment.apiRoot + '/comments';

  constructor(private http: HttpClient) {
  }

  getCommentsByTarget(targetId): Observable<any> {
    return this.http.get(`${this.COMMENTS_API}/search/findByTargetId?targetId=${targetId}`)
  }

  postComment(comment): Observable<any> {
    return this.http.post(this.COMMENTS_API, comment)
  }

}
