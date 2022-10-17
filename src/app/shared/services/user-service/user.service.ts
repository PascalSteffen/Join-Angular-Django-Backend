import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../interfaces/AuthResData';
import { AuthenticationService } from '../authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private allUsers$ = new BehaviorSubject<User[]>([])

  constructor(private HttpRequest: HttpClient, public authenticationService: AuthenticationService) { }

  public initAllUsers(): void {
    this.HttpRequest.get<User[]>('https://join-backend-21012101.herokuapp.com/api/users/',
      { headers: this.authenticationService.setTokenToHeader() }).subscribe(allUsers => {
        this.allUsers$.next(allUsers)
      })
  }

  public getAllUsers(): Observable<User[]> {
    return this.allUsers$;
  }


  updateUser(user: User) {
    const body = {
      id: user['id'],
      username: user['username'],
      first_name: user['first_name'],
      last_name: user['last_name'],
      email: user['email'],
      is_staff: user['is_staff'],
      is_superuser: user['is_superuser'],
      token: user['token'],
    };
    return this.HttpRequest.put<User[]>(`https://join-backend-21012101.herokuapp.com/api/users/${user['id']}/`,
      body, { headers: this.authenticationService.setTokenToHeader() })
  }


  deleteUser(id: number) {
    return this.HttpRequest.delete<User[]>(`https://join-backend-21012101.herokuapp.com/api/users/${id}/`,
      { headers: this.authenticationService.setTokenToHeader() })
  }


  setAdmin(user: User, is_staff: boolean) {
    const body = {
      id: user['id'],
      username: user['username'],
      first_name: user['first_name'],
      last_name: user['last_name'],
      email: user['email'],
      is_staff: is_staff,
      is_superuser: user['is_superuser'],
      token: user['token'],
    };
    return this.HttpRequest.put<User[]>(`https://join-backend-21012101.herokuapp.com/api/users/${user['id']}/`,
      body, { headers: this.authenticationService.setTokenToHeader() })
  }
}
