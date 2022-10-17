import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';
import { EditUserComponent } from 'src/app/user-components/edit-user/edit-user.component';
import { TaskService } from '../../shared/services/task-service/task.service';
import { Task } from 'src/app/shared/interfaces/task';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})

export class SummaryComponent implements OnInit {

  public allTasks$: Observable<Task[]>;
  currentTime: string;
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
    this.currentDayTime();
  }


  openEditUsernameDialog() {
    const dialogRef = this.dialog.open(EditUserComponent);
  }


  /**
   * get current day time
   */
  currentDayTime() {
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 6 && hours < 12) {
      this.currentTime = 'Good morning'
    }

    if (hours >= 12 && hours < 18) {
      this.currentTime = 'Good afternoon'
    }

    if (hours >= 18 && hours < 24) {
      this.currentTime = 'Good evening'
    }

    if (hours >= 0 && hours < 6) {
      this.currentTime = 'Good night'
    }
  }

}
