import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {MatSnackBar, MatTableDataSource} from "@angular/material";
import {AttachmentService} from "../../shared/attachments/attachment.service";

@Component({
  selector: 'attachments-component',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit {

  @Input('targetId')
  targetId: number;
  @Input('targetType')
  targetType: string;
  @Input('dataChangedEmitter')
  dataChangedEmitter: EventEmitter<any>;

  attachmentsDS = new MatTableDataSource();

  constructor(public attachmentService: AttachmentService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.attachmentService.getAttachments(this.targetId, this.targetType).subscribe(data => {
      this.attachmentsDS.data = data._embedded.attachmentEntities;
    });
  }

  deleteAttachment(attachment) {
    this.attachmentService.delete(attachment.id).subscribe(() => {
      const index = this.attachmentsDS.data.indexOf(attachment);
      this.attachmentsDS.data.splice(index, 1);
      this.attachmentsDS._updateChangeSubscription();
      this.showSnackBar(`Attachment[${attachment.name}] has been deleted.`);
      this.dataChangedEmitter.emit();
    }, error => this.showSnackBar(`Failed to delete attachment. ${error.message}`));
  }

  uploadAttachment(event) {
    let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    this.attachmentService.upload(files, this.targetId, this.targetType).subscribe(response => {
      this.refreshTable();
      this.showSnackBar(`[${files.length}] files has been uploaded.`);
      this.dataChangedEmitter.emit();
    }, error => {
      this.showSnackBar(`Failed to upload [${files.length}] files for [${this.targetId} - ${this.targetType}].`);
    });
  }

  refreshTable() {
    this.ngOnInit();
    this.attachmentsDS._updateChangeSubscription();
  }

  showSnackBar(message: string, timeout = 2000) {
    this.snackBar.open(message, null, {
      duration: timeout,
    });
  }

}
