import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CandidatesService} from "../../../shared/candidates/candidates.service";
import {MatSnackBar} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'candidate-edit-component',
  templateUrl: './candidate-edit.component.html',
  styleUrls: ['./candidate-edit.component.css']
})
export class CandidateEditComponent implements OnInit {

  @Input('candidate')
  candidate: any;
  @Input('dataChangedEmitter')
  dataChangedEmitter: EventEmitter<any>;

  constructor(private candidateService: CandidatesService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
  }

  save(form: NgForm) {
    this.candidateService.save(form).subscribe(result => {
      this.dataChangedEmitter.emit();
      if (this.candidate.href) {
        this.showSnackBar(`Candidate has been updated.`);
      } else {
        this.showSavedSnackBar(result.id);
      }

    }, error => this.showSnackBar(`Cannot save candidate. ${error.message}`));
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  showSavedSnackBar(candidateId) {
    this.snackBar.open(`Candidate has been saved.`, 'Edit', {
      duration: 3000,
    }).onAction()
      .subscribe(() => this.router.navigate(['/candidate', candidateId]));
  }

}
