import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CandidatesService {

  constructor(private http: HttpClient) {
  }

  public API = '//localhost:8080';
  public CANDIDATES_API = this.API + '/candidates';

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
