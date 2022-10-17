import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces/AuthResData';
import { Task } from 'src/app/shared/interfaces/task';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';
import { TaskService } from 'src/app/shared/services/task-service/task.service';
import { UserService } from 'src/app/shared/services/user-service/user.service';
import { UtilityServiceService } from 'src/app/shared/services/utility-service/utility-service.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})

export class EditTaskComponent implements OnInit {

  public allTasks$: Observable<Task[]>;
  public allUsers$: Observable<User[]>;
  task: Task = this.taskService.taskDefault();
  date: Date;

  titleFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);
  categorieFormControl = new FormControl('', [Validators.required]);
  assignToFormControl = new FormControl('', [Validators.required]);
  dueDateFormControl = new FormControl('', [Validators.required]);
  priorityFormControl = new FormControl('', [Validators.required]);


  constructor(public taskService: TaskService,
    public authenticationService: AuthenticationService,
    public userService: UserService,
    public utilityService: UtilityServiceService) { }


  ngOnInit(): void {
    this.date = new Date(this.task.upcoming_deadline);
    this.authenticationService.isAuthenticated();
    this.allUsers$ = this.userService.getAllUsers();
    this.userService.initAllUsers();
  }


  updateTask() {
    this.taskService.updateTask(this.task, this.date).subscribe(() => {
      this.utilityService.alert('Task updated successfully.', 5000);
      this.allTasks$ = this.taskService.getAllTasks();
      this.allTasks$.subscribe(response => {
        this.taskService.resetForNewSubscribe(response);
        this.taskService.getSummaryInfos(response);
        this.taskService.nextImportantDate.sort();
      })
      this.taskService.initAllTasks();
    })
  }

}
