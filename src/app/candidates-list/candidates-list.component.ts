import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CandidatesService} from '../shared/candidates/candidates.service';
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.css']
})
export class CandidatesListComponent implements OnInit {

  candidatesDS =  new MatTableDataSource();

  columnsToDisplay: Array<any> = ["id", "name", "email", "position", "operations"];

  constructor(private candidatesService: CandidatesService) {
  }

  ngOnInit() {
    this.candidatesService.getAll().subscribe(data => {
      this.candidatesDS.data = data._embedded.candidates;
    });
  }

  deleteUser(candidate: any) {
    this.candidatesService.remove(candidate._links.self.href).subscribe(result => {
      const index = this.candidatesDS.data.indexOf(candidate);
      this.candidatesDS.data.splice(index, 1);
      this.candidatesDS._updateChangeSubscription()

    }, error => console.error(error));
  }
}
