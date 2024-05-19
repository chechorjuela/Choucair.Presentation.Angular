import {Component, Inject, Input, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.scss'
})
export class ConfirmDeleteComponent {

  @Input() data: any;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public modalData: any
  ) {}

  ngOnInit() {
    if (!this.data) {
      this.data = this.modalData; // Ensure data is available
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  confirmDelete() {
    this.dialogRef.close(true); // Pass true on confirmation
  }

}
