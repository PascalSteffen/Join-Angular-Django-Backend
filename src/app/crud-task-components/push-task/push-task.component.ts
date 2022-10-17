import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/shared/interfaces/task';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';
import { TaskService } from 'src/app/shared/services/task-service/task.service';
import { UtilityServiceService } from 'src/app/shared/services/utility-service/utility-service.service';

@Component({
  selector: 'app-push-task',
  templateUrl: './push-task.component.html',
  styleUrls: ['./push-task.component.scss']
})

export class PushTaskComponent implements OnInit {
  public allTasks$: Observable<Task[]>;
  task: Task;

  constructor(public taskService: TaskService,
    public authenticationService: AuthenticationService,
    public utilityService: UtilityServiceService) { }


  ngOnInit(): void {
    this.authenticationService.isAuthenticated();
  }


  pushTask(task: any, todo: boolean, in_progress: boolean, awaiting_feedback: boolean, done: boolean, history: boolean) {
    this.taskService.pushTask(task, todo, in_progress, awaiting_feedback, done, history).subscribe(() => {
      this.utilityService.alert('Task passed successfully.', 5000);
      this.allTasks$ = this.taskService.getAllTasks();
      this.allTasks$.subscribe(response => {
        this.taskService.resetForNewSubscribe(response);
        this.taskService.getSummaryInfos(response);
        this.taskService.nextImportantDate.sort();
      })
      this.taskService.initAllTasks();
    });
  }

}
