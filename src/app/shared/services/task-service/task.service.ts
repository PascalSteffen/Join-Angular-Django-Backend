import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { Task } from '../../interfaces/task';
@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private allTasks$ = new BehaviorSubject<Task[]>([])

  allTodos: Object[];
  allTodosOnBoard: number = 0;
  priorityUrgent: number = 0;
  allTaskTodo: number = 0;
  allTaskInProgress: number = 0;
  allTaskAwaitingFeedback: number = 0;
  allTaskDone: number = 0;
  taskHistory: number = 0;
  nextImportantDate = [];


  constructor(private HttpRequest: HttpClient, private authenticationService: AuthenticationService) { }

  public initAllTasks(): void {
    this.HttpRequest.get<Task[]>('https://join-backend-2101.herokuapp.com/api/tasks/',
      { headers: this.authenticationService.setTokenToHeader() }).subscribe(allTasks => {
        this.allTasks$.next(allTasks)
      })
  }


  public getAllTasks(): Observable<Task[]> {
    return this.allTasks$;
  }


  createTask(task: Task, date: Date) {
    let upcoming_deadline = date.getTime() / 1000;
    const body = {
      title: task.title,
      description: task.description,
      username: task.assigned_to,
      category: task.category,
      priority: task.priority,
      upcoming_deadline: upcoming_deadline,
      todo: task.todo,
      in_progress: task.in_progress,
      awaiting_feedback: task.awaiting_feedback,
      done: task.done,
      history: task.history
    };
    return this.HttpRequest.post<Task[]>(`https://join-backend-2101.herokuapp.com/api/tasks/`,
      body, { headers: this.authenticationService.setTokenToHeader() })
  }


  updateTask(task: Task, date: Date) {
    let upcoming_deadline = date.getTime() / 1000;
    const body = {
      title: task.title,
      description: task.description,
      username: task.assigned_to['username'],
      category: task.category,
      priority: task.priority,
      upcoming_deadline: upcoming_deadline,
      todo: task.todo,
      in_progress: task.in_progress,
      awaiting_feedback: task.awaiting_feedback,
      done: task.done,
      history: task.history
    };
    return this.HttpRequest.put<Task[]>(`https://join-backend-2101.herokuapp.com/api/tasks/${task.id}/`,
      body, { headers: this.authenticationService.setTokenToHeader() })
  }


  pushTask(task: Task, todo: boolean, in_progress: boolean, awaiting_feedback: boolean, done: boolean, history: boolean) {
    let upcoming_deadline = new Date(task.upcoming_deadline).getTime() / 1000;
    const body = {
      title: task.title,
      description: task.description,
      username: task.assigned_to.username,
      category: task.category,
      priority: task.priority,
      upcoming_deadline: upcoming_deadline,
      todo: todo,
      in_progress: in_progress,
      awaiting_feedback: awaiting_feedback,
      done: done,
      history: history
    };
    return this.HttpRequest.put<Task[]>(`https://join-backend-2101.herokuapp.com/api/tasks/${task.id}/`,
      body, { headers: this.authenticationService.setTokenToHeader() })
  }


  deleteTask(id: number) {
    return this.HttpRequest.delete<Task[]>(`https://join-backend-2101.herokuapp.com/api/tasks/${id}/`,
      { headers: this.authenticationService.setTokenToHeader() })
  }


  taskDefault() {
    return {
      id: 0,
      title: '',
      description: '',
      assigned_to: {
        'username': '',
        'first_name': '',
        'last_name': ''
      },
      category: '',
      upcoming_deadline: 0,
      priority: '',
      todo: true,
      in_progress: false,
      awaiting_feedback: false,
      done: false,
      history: false,
    };
  }


  /**
  * reset all variablen for correct subscribe
  * @param newTask
  */
  resetForNewSubscribe(newTask: Object[]) {
    this.allTodos = newTask;
    this.allTodosOnBoard = 0;
    this.priorityUrgent = 0;
    this.allTaskTodo = 0;
    this.allTaskDone = 0;
    this.allTaskInProgress = 0;
    this.allTaskAwaitingFeedback = 0;
    this.taskHistory = 0;
    this.nextImportantDate = [];
  }


  /**
   * get all infos for the summary
   * @param newTask
   */
  getSummaryInfos(newTask: Object[]) {
    for (let i = 0; i < newTask.length; i++) {
      const priority = newTask[i]['priority'];
      const todo = newTask[i]['todo']
      const done = newTask[i]['done']
      const in_progress = newTask[i]['in_progress'];
      const awaiting_feedback = newTask[i]['awaiting_feedback'];
      const nextImportantDate = newTask[i]['upcoming_deadline'];
      const NoHistory = newTask[i]['history'];
      this.addTaskValues(priority, in_progress, awaiting_feedback, todo, done, nextImportantDate, NoHistory);
    }
  }


  /**
   * update all task values
   * @param priority
   * @param inProgress
   * @param awaitingFeedback
   * @param todo
   * @param done
   * @param nextImportantDate
   */
  addTaskValues(priority: string, in_progress: boolean, awaiting_feedback: boolean, todo: boolean, done: boolean, nextImportantDate: number, NoHistory: boolean) {
    if (priority === 'Urgent' && NoHistory == false) {
      this.nextImportantDate.push(nextImportantDate);
      this.priorityUrgent++
    }
    if (in_progress === true && NoHistory == false) {
      this.allTaskInProgress++
      this.allTodosOnBoard++
    }
    if (awaiting_feedback === true && NoHistory == false) {
      this.allTaskAwaitingFeedback++
      this.allTodosOnBoard++
    }
    if (todo === true && NoHistory == false) {
      this.allTaskTodo++
      this.allTodosOnBoard++
    }
    if (done === true && NoHistory == false) {
      this.allTaskDone++
      this.allTodosOnBoard++
    }
    if (NoHistory == true) {
      this.taskHistory++
    }
  }


  /**
   * find task on Board
   * @param task
   * @returns
   */
  findTodoTask(task: any) {
    return task.todo == true;
  }

  findInProgressTask(task: any) {
    return task.in_progress == true;
  }

  findAwatingFeedbackTask(task: any) {
    return task.awaiting_feedback == true;
  }

  findDoneTask(task: any) {
    return task.done == true;
  }
  findHistoryTask(task: any) {
    return task.history == true;
  }

}
