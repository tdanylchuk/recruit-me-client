import {Component, OnInit} from '@angular/core';
import {CandidatesService} from '../shared/candidates/candidates.service';
import {MatTableDataSource} from "@angular/material";
import {AttachmentService} from "../shared/attachments/attachment.service";
import * as FileSaver from "file-saver";

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.css']
})
export class CandidatesListComponent implements OnInit {

  candidatesDS = new MatTableDataSource();

  columnsToDisplay: Array<any> = ["id", "name", "email", "position", "attachments", "operations"];

  constructor(private candidatesService: CandidatesService,
              private attachmentService: AttachmentService) {
  }

  ngOnInit() {
    this.candidatesService.getAll().subscribe(data => {
      this.candidatesDS.data = data._embedded.candidateEntities;
    });
  }

  downloadFile(attachmentId: any) {
    console.info("Downloading file - " + attachmentId);
    this.attachmentService.download(attachmentId);
  }

  deleteUser(candidate: any) {
    this.candidatesService.remove(candidate._links.self.href).subscribe(() => {
      const index = this.candidatesDS.data.indexOf(candidate);
      this.candidatesDS.data.splice(index, 1);
      this.candidatesDS._updateChangeSubscription()
    }, error => console.error(error));
  }
}
