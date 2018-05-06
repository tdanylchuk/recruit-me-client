import {Component, EventEmitter, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

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
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.sub = this.saveEmitter.subscribe(() => {
      this.dialogRef.close();
      this.data.changeEmitter.emit();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
