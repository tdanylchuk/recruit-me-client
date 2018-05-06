import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as FileSaver from "file-saver";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class AttachmentService {

  constructor(private http: HttpClient) {
  }

  private ATTACHMENTS_API = environment.apiRoot + '/attachments';
  private UPLOAD_ATTACHMENTS_API = `${this.ATTACHMENTS_API}/upload`;

  download(attachmentId: any) {
    this.http.get(`${this.ATTACHMENTS_API}/${attachmentId}/download`, {observe: 'response', responseType: 'blob'})
      .subscribe(response => {
        const contentDisposition: String = response.headers.get('Content-Disposition');
        const filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
        console.info(`Downloading file[${filename}]...`);
        FileSaver.saveAs(response.body, filename);
      });
  }

  upload(files): Observable<any> {
    let formData: FormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i], files[i].name);
    }

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options = {headers: headers};
    return this.http.post(this.UPLOAD_ATTACHMENTS_API, formData, options);
  }

  delete(attachmentId: any): Observable<Object> {
    return this.http.delete(`${this.ATTACHMENTS_API}/${attachmentId}`);
  }

  getAttachments(targetId: any) : Observable<any> {
    return this.http.get(`${this.ATTACHMENTS_API}/search/findByCandidateId?candidateId=${targetId}`)
  }

}
