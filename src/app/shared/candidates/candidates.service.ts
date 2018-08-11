import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable()
export class CandidatesService {

  constructor(private http: HttpClient) {
  }

  private CANDIDATES_API = environment.apiRoot + '/candidates';

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

}
