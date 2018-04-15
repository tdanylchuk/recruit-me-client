import {Component, OnInit} from '@angular/core';
import {CandidatesService} from '../shared/candidates/candidates.service';
import {MatSnackBar, MatTableDataSource} from "@angular/material";
import {AttachmentService} from "../shared/attachments/attachment.service";

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.css']
})
export class CandidatesListComponent implements OnInit {

  candidatesDS = new MatTableDataSource();

  columnsToDisplay: Array<any> = ["id", "firstName", "lastName", "email", "position", "attachments", "operations"];

  constructor(private candidatesService: CandidatesService,
              private attachmentService: AttachmentService,
              private snackBar: MatSnackBar) {
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
      this.candidatesDS._updateChangeSubscription();
      this.showSnackBar("Candidate has been removed");
    }, error => console.error(error));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.candidatesDS.filter = filterValue;
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 1000,
    });
  }
}
