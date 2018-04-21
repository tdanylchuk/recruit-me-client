import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar, MatTableDataSource} from "@angular/material";
import {AttachmentService} from "../../shared/attachments/attachment.service";
import {CandidatesService} from "../../shared/candidates/candidates.service";

@Component({
  selector: 'attachments-component',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit {

  @Input('candidate')
  getCandidate: any;

  @Input('refreshCallback')
  refreshCallback: any;

  attachmentsDS = new MatTableDataSource();

  constructor(public attachmentService: AttachmentService,
              private snackBar: MatSnackBar,
              private candidateService: CandidatesService) {
  }

  ngOnInit() {
    this.attachmentsDS.data = this.getCandidate()._embedded ? this.getCandidate()._embedded.attachments : null;
  }

  deleteAttachment(attachment) {
    this.attachmentService.delete(attachment.id).subscribe(() => {
      const index = this.attachmentsDS.data.indexOf(attachment);
      this.attachmentsDS.data.splice(index, 1);
      this.attachmentsDS._updateChangeSubscription();
      this.showSnackBar(`Attachment[${attachment.name}] has been deleted.`);
    }, error => this.showSnackBar(`Failed to delete attachment. ${error.message}`));
  }

  uploadAttachment(event) {
    let candidateId = this.getCandidate().id;
    let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    this.attachmentService.upload(files).subscribe(response => {
      this.candidateService.addAttachments(candidateId, response).subscribe(() => {
        this.refreshTable();
        this.showSnackBar(`[${files.length}] files has been uploaded.`);
      }, error => {
        this.showSnackBar(`Failed to assign [${files.length}] files to candidate[${candidateId}].`)
      });
    }, error => {
      this.showSnackBar(`Failed to upload [${files.length}] files to candidate[${candidateId}].`);
    });
  }

  refreshTable() {
    this.refreshCallback(() => {
      this.ngOnInit();
      this.attachmentsDS._updateChangeSubscription();
    });
  }

  showSnackBar(message: string, timeout = 2000) {
    this.snackBar.open(message, null, {
      duration: timeout,
    });
  }

}