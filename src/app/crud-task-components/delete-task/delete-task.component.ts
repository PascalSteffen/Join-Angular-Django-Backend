import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared/services/task-service/task.service';
import { Task } from 'src/app/shared/interfaces/task';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';
import { UtilityServiceService } from 'src/app/shared/services/utility-service/utility-service.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})

export class DeleteTaskComponent implements OnInit {

  public allTasks$: Observable<Task[]>;
  task: Task;

  constructor(public taskService: TaskService,
    public authenticationService: AuthenticationService,
    public utilityService: UtilityServiceService) { }

  ngOnInit(): void {
    this.authenticationService.isAuthenticated();
  }


  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.utilityService.alert('Task deleted successfully.', 5000);
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
