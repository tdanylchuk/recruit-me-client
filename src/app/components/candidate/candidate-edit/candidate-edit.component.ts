import {Component, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, NgForm} from "@angular/forms";
import {CandidatesService} from "../../../shared/candidates/candidates.service";
import {MatSnackBar} from "@angular/material";

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
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  save(form: NgForm) {
    this.candidateService.save(form).subscribe(result => {
      this.dataChangedEmitter.emit();
      this.showSnackBar(`Candidate has been updated.`, 1000);
    }, error => this.showSnackBar(`Cannot update candidate. ${error.message}`, 1000));
  }

  showSnackBar(message: string, timeout = 2000) {
    this.snackBar.open(message, null, {
      duration: timeout,
    });
  }

}
