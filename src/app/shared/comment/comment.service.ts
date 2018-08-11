import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TargetParamUtils} from "../target.param.utils";

@Injectable()
export class CommentService {

  private COMMENTS_API = environment.apiRoot + '/comments';

  constructor(private http: HttpClient) {
  }

  getCommentsByTarget(targetId: number, targetType: string): Observable<any> {
    let params = TargetParamUtils.getParams(targetId, targetType);

    return this.http.get(`${this.COMMENTS_API}/search/findByTargetIdAndTargetType`, {params: params})
  }

  postComment(comment): Observable<any> {
    return this.http.post(this.COMMENTS_API, comment)
  }

}
