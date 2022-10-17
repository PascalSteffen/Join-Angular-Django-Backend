import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TaskService } from '../../shared/services/task-service/task.service';
import { TaskDetailComponent } from '../../crud-task-components/task-detail/task-detail.component';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';
import { Task } from 'src/app/shared/interfaces/task';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {

  public allTasks$: Observable<Task[]>;
  date: Date;
  searchTodo: string;
  loading: boolean = false;

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


  openDialog(task: Task) {
    const dialogRef = this.dialog.open(TaskDetailComponent);
    dialogRef.componentInstance.task = task;
  }

}
