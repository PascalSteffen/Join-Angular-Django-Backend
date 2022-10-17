import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TaskService } from '../../shared/services/task-service/task.service';
import { TaskDetailComponent } from '../../crud-task-components/task-detail/task-detail.component';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';
import { Task } from 'src/app/shared/interfaces/task';
@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.scss']
})
export class TaskHistoryComponent implements OnInit {
  public allTasks$: Observable<Task[]>;

  loading: boolean = false;
  searchTodo: string;
  allTasks: Object[];

  constructor(public taskService: TaskService,
    public dialog: MatDialog,
    public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.isAuthenticated();
    this.allTasks$ = this.taskService.getAllTasks();
    this.allTasks$.subscribe(response => {
      this.taskService.resetForNewSubscribe(response);
      this.taskService.getSummaryInfos(response);
      this.taskService.nextImportantDate.sort();
      setTimeout(() => {
        this.loading = true;
      }, 500);
    })
    this.taskService.initAllTasks();
  }


  openDialog(task: any) {
    const dialogRef = this.dialog.open(TaskDetailComponent);
    dialogRef.componentInstance.task = task;
  }
}
