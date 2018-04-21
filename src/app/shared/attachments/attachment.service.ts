import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as FileSaver from "file-saver";
import {Observable} from "rxjs/Observable";
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

  delete(attachmentId: any): Observable<Object> {
    return this.http.delete(`${this.ATTACHMENTS_API}/${attachmentId}`);
  }

  getUploadUrl(): string {
    return this.UPLOAD_ATTACHMENTS_API;
  }

}
