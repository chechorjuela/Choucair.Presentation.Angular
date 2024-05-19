import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { getTaskByUserRequest, deleteTaskRequest } from '../../store/actions/task.actions';
import { selectTasksUser, selectTasksLoading, selectTasksError } from '../../store/selectors/task.selectors';
import { TaskModalComponent } from '../../modules/task-modal/task-modal.component';
import { ConfirmDeleteComponent } from '../../modules/confirm-delete/confirm-delete.component';
import { TaskModel } from '../../store/models/task.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let store: MockStore;
  let dialog: jasmine.SpyObj<MatDialog>;

  const initialState = {
    tasks: {
      userTasks: [],
      loading: false,
      error: null
    }
  };

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [TaskComponent],
      imports: [
        NoopAnimationsModule
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;

    // Mock store selectors
    store.overrideSelector(selectTasksUser, []);
    store.overrideSelector(selectTasksLoading, false);
    store.overrideSelector(selectTasksError, null);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getTaskByUserRequest on initialization', () => {
    spyOn(store, 'dispatch').and.callThrough();
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(getTaskByUserRequest());
  });

  it('should open task modal on openTaskModal call', () => {
    component.openTaskModal();
    expect(dialog.open).toHaveBeenCalledWith(TaskModalComponent, { width: '400px' });
  });

  it('should open edit modal on openEditModal call', () => {
    const task: TaskModel = { id: 1, title: 'Test', description: 'Test description', time: new Date(), createAt: new Date(), userId: 1, isCompleted: false };
    component.openEditModal(task);
    expect(dialog.open).toHaveBeenCalledWith(TaskModalComponent, { data: { task }, width: '400px' });
  });

  it('should open confirm delete modal and dispatch deleteTaskRequest on deleteTask call', () => {
    const task: TaskModel = { id: 1, title: 'Test', description: 'Test description', time: new Date(), createAt: new Date(), userId: 1, isCompleted: false };
    dialog.open.and.returnValue({ afterClosed: () => of(true) } as any);
    component.deleteTask(task);
    expect(dialog.open).toHaveBeenCalledWith(ConfirmDeleteComponent, { data: { task } });
    expect(store.dispatch).toHaveBeenCalledWith(deleteTaskRequest({ task }));
  });
});
