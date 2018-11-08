import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

export interface Compensation {
  category: string
  amount: number;
  description: string;
}

@Component({
  selector: 'compensation-dialog',
  templateUrl: './compensation-dialog.html',
  styleUrls: ['./compensation-dialog.css']
})
export class CompensationDialog {

  compensation: Compensation = {
    category: this.categories[0].category,
    amount: null,
    description: ""
  };

  constructor(public dialogRef: MatDialogRef<CompensationDialog>,
              @Inject(MAT_DIALOG_DATA) public categories: any) {
  }

  onAdd(): void {
    this.dialogRef.close(this.compensation);
  }

}
