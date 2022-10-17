import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Task } from 'src/app/shared/interfaces/task';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';
import { TaskService } from 'src/app/shared/services/task-service/task.service';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { PushTaskComponent } from '../push-task/push-task.component';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})

export class TaskDetailComponent implements OnInit {

  public allTasks$: Observable<Task[]>;
  task: Task = this.taskService.taskDefault();

  constructor(public dialog: MatDialog,
    public taskService: TaskService,
    public authenticationService: AuthenticationService) { }


  ngOnInit(): void {
    this.authenticationService.isAuthenticated();
  }


  openEditDialog() {
    const dialogRef = this.dialog.open(EditTaskComponent);
    dialogRef.componentInstance.task = this.task;
    dialogRef.afterClosed().subscribe(() => {
      this.allTasks$ = this.taskService.getAllTasks();
      this.allTasks$.subscribe(response => {
        this.taskService.resetForNewSubscribe(response);
        this.taskService.getSummaryInfos(response);
        this.taskService.nextImportantDate.sort();
      })
      this.taskService.initAllTasks();
    });
  }


  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteTaskComponent);
    dialogRef.componentInstance.task = this.task;
  }


  openPushtoNextDialog() {
    const dialogRef = this.dialog.open(PushTaskComponent);
    dialogRef.componentInstance.task = this.task;
  }

}
