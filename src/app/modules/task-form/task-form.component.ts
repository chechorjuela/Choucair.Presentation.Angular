import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskModel} from "../../store/models/task.model";
import {
  postTaskRequest,
  putTaskRequest
} from "../../store/actions/task.actions";
import {Store} from "@ngrx/store";
import {LocalStorageService} from "../../utils/local-storage.service";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {

  @Input() taskpath!: TaskModel;
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store, private localStorageService: LocalStorageService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      time: [null, Validators.required],
      isCompleted: [false]
    });
  }

  ngOnInit(): void {
    if (this.taskpath) {
      this.taskForm.patchValue({
        title: this.taskpath.title,
        time: this.taskpath.time,
        description: this.taskpath.description,
        isCompleted: this.taskpath.isCompleted
      });
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const {userId} = this.localStorageService.get('user');

      let task: TaskModel = {
        id: this.taskpath ? this.taskpath.id : undefined,
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        time: this.taskForm.value.time,
        userId: userId,
        isCompleted: this.taskForm.value.isCompleted
      }

      if (this.taskpath) {
        this.store.dispatch(putTaskRequest({task}));
      } else {
        this.store.dispatch(postTaskRequest({task}));
      }
      this.onCancel.emit();

    }
  }
}
