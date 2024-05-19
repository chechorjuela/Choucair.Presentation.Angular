import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TaskModel} from "../../store/models/task.model";

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})
export class TaskModalComponent implements OnInit {

  @Input() data: any;

  constructor(public dialogRef: MatDialogRef<TaskModalComponent>,
              @Inject(MAT_DIALOG_DATA) public modalData: any) {
  }

  ngOnInit(): void {
    if (!this.data) {
      const {task} = this.modalData
      this.data = task;
    }
  }

  onTaskSubmit(task: TaskModel) {
    this.dialogRef.close(task);
  }

  onCancel(): void {
    this.dialogRef.close();
  }


}
