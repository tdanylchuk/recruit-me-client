import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CandidatesService} from "../../../shared/candidates/candidates.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'candidate-add-component',
  templateUrl: './candidate-add.component.html',
  styleUrls: ['./candidate-add.component.css']
})
export class CandidateAddComponent implements OnInit {

  candidate: any = {};

  constructor(private candidateService: CandidatesService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
  }

  save(form: NgForm) {
    this.candidateService.save(form).subscribe(result => {
      this.showSnackBar(`Candidate has been saved.`);
      this.router.navigate(['/candidate', result.id])
    }, error => this.showSnackBar(`Cannot save candidate. ${error.message}`));
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }
}
