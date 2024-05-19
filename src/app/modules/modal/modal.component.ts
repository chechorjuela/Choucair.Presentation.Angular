import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {TaskFormComponent} from "../task-form/task-form.component";
import {TaskModel} from "../../store/models/task.model";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  constructor(public dialogRef: MatDialogRef<TaskFormComponent>) {}

  onTaskSubmit(task: TaskModel) {
    this.dialogRef.close(task);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
