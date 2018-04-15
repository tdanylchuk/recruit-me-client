import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Constants} from "../constants.enum";

@Injectable()
export class CandidatesService {

  constructor(private http: HttpClient) {
  }

  private API = '//' + Constants.restEndpointUrl;
  private CANDIDATES_API = this.API + '/candidates';

  getAll(): Observable<any> {
    return this.http.get(this.CANDIDATES_API);
  }

  get(id: string) {
    return this.http.get(this.CANDIDATES_API + '/' + id);
  }

  save(candidate: any): Observable<any> {
    let result: Observable<Object>;
    if (candidate['href']) {
      result = this.http.put(candidate.href, candidate);
    } else {
      result = this.http.post(this.CANDIDATES_API, candidate);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }

  addAttachments(candidateId, attachmentIds: any): Observable<any> {
    return this.http.post(`${this.CANDIDATES_API}/${candidateId}/attachments`, attachmentIds,
      {headers: {'Content-Type': 'application/json'}});
  }

}
