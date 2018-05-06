import {Component, EventEmitter, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'app-candidate-add-dialog',
  templateUrl: './candidate-add-dialog.component.html',
  styleUrls: ['./candidate-add-dialog.component.css']
})
export class CandidateAddDialogComponent implements OnInit, OnDestroy {

  candidate: any = {};
  saveEmitter = new EventEmitter<any>();
  sub: Subscription;

  constructor(private dialogRef: MatDialogRef<CandidateAddDialogComponent>,
              private router: Router) {
  }

  ngOnInit() {
    this.sub = this.saveEmitter.subscribe(candidateId => {
      this.dialogRef.close();
      this.router.navigate(['/candidate', candidateId]);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
