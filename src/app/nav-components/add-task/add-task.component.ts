import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces/AuthResData';
import { Task } from 'src/app/shared/interfaces/task';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';
import { TaskService } from 'src/app/shared/services/task-service/task.service';
import { UserService } from 'src/app/shared/services/user-service/user.service';
import { UtilityServiceService } from 'src/app/shared/services/utility-service/utility-service.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})

export class AddTaskComponent implements OnInit {
  titleFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);
  categorieFormControl = new FormControl('', [Validators.required]);
  assignToFormControl = new FormControl('', [Validators.required]);
  dueDateFormControl = new FormControl('', [Validators.required]);
  priorityFormControl = new FormControl('', [Validators.required]);

  public allUsers$: Observable<User[]>;
  task: Task = this.taskService.taskDefault();
  date: Date;
  public allTasks: Object[]

  constructor(public userService: UserService,
    public taskService: TaskService,
    public authenticationService: AuthenticationService, public utilityService: UtilityServiceService, public router: Router) { }


  ngOnInit(): void {
    this.authenticationService.isAuthenticated();
    this.allUsers$ = this.userService.getAllUsers();
    this.userService.initAllUsers();
  }

  createTask() {
    this.taskService.createTask(this.task, this.date).subscribe(() => {
      this.utilityService.alert('Task created successfully.', 5000);
      this.router.navigate(['board']);
    });
  }

  /**
   * clear the form values.
   * @param form
   */
  clearForm(form: any) {
    form.reset();
  }

}
