import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { User } from '../../interfaces/AuthResData';
import { UtilityServiceService } from '../utility-service/utility-service.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  isloading: boolean = false;
  token: string;
  currentUserData: User = this.userDefault();

  constructor(private HttpRequest: HttpClient, public router: Router, public utilityService: UtilityServiceService) { }


  /**
   * register a new User on API-Endpoint register
   * @param userData
   */
  registerNewUser(userData: Object) {
    return this.HttpRequest.post<Object>('https://join-backend-2101.herokuapp.com/api/auth/register', userData);
  }


  sendVerification(userData: Object) {
    return this.HttpRequest.post<Object>('https://join-backend-2101.herokuapp.com/api/password_reset/', userData);
  }


  /**
   * get the new token for reset on API-Endpoint password_reset
   * @param userData
   */
  forgotPassword(userData: Object) {
    this.HttpRequest.post<Object>('http://127.0.0.1:8000/api/password_reset/', userData)
      .pipe(
        catchError(() => {
          return of(this.utilityService.alert('This token entry is incorrect. Please contact an administrator.', 5000));
        })
      ).subscribe(response => {
        if (response) {
          this.utilityService.alert('Password reset successfully.', 5000);
          this.router.navigate(['verify-account']);
        }
      })
  }


  /**
   * Confirm the new password with the email-token on API-Endpoint password_reset/confirm
   * @param userData
   */
  confirmPassword(userData: Object) {
    this.HttpRequest.post<Object>('http://127.0.0.1:8000/api/password_reset/confirm/', userData)
      .pipe(
        catchError(() => {
          return of(this.utilityService.alert('This token entry is incorrect. Please contact an administrator.', 5000));
        })
      ).subscribe(response => {
        if (response) {
          this.utilityService.alert('Account was successfully verified with your entered password.', 5000);
          this.router.navigate(['login']);
        }
      })
  }


  /**
   *
   * @param userData
   */
  loginUser(userData: Object) {
    this.isloading = true;
    this.HttpRequest.post<Object>('http://127.0.0.1:8000/api/auth/login', userData)
      .pipe(
        catchError(() => {
          return of(this.utilityService.alert('The user does not exist, or the data you entered does not match. Please contact an administrator.', 5000))
        })
      ).subscribe(response => {
        if (response) {
          this.token = response['token'];
          this.checkToken(response['token']).subscribe(response => {
            this.isloading = false;
            this.setUserToLocalStorage(response)
            this.utilityService.alert('Successfully logged in.', 5000);
            this.router.navigate(['home']);
          })
        }
      })
  }


  /**
   * login a user on API-Endpoint login. After login, token check on next API-Endpoint user.
   * After token check add user on localstorage and forward to component home.
   * @param username
   * @param password
   */
  showLoginUser(username: string, password: string) {
    this.isloading = true;
    let userdata = {
      username: username,
      password: password
    }
    this.HttpRequest.post<Object>('http://127.0.0.1:8000/api/auth/login', userdata).subscribe(response => {
      this.token = response['token'];
      this.checkToken(response['token'])
        .pipe(
          catchError(() => {
            return of(this.utilityService.alert('This token entry is incorrect. Please contact an administrator.', 5000));
          })
        ).subscribe(response => {
          if (response) {
            this.isloading = false;
            this.setUserToLocalStorage(response)
            this.utilityService.alert('Successfully logged in.', 5000);
            this.router.navigate(['home']);
          }
        });
    })
  }


  /**
   * set user to localstorage, after token check on API-Endpoint user.
   * @param res
   */
  setUserToLocalStorage(res: User) {
    this.currentUserData = res;
    this.currentUserData['token'] = this.token;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUserData));
  }


  /**
   * checked user token on every component. Is the token expired than the user will be logged out.
   */
  isAuthenticated() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      this.checkToken(user['token'])
        .pipe(
          catchError(() => {
            return of(this.sessionExpired())
          }),
        ).subscribe(response => {
          if (response) {
            this.currentUserData = user;
          }
        });
    }
  }


  /**
   * autologin in localstorage, token is available
   * @returns
   */
  autoLogin() {
    this.currentUserData = JSON.parse(localStorage.getItem('currentUser'))
    if (!this.currentUserData) {
      return
    }
    /*     const loadedUser = new User(userData.id, userData.username, userData.first_name, userData.last_name, userData.email, userData.is_staff, userData.is_superuser, userData.token)
        this.user.next(loadedUser); */
  }


  /**
   * check if user logged in.
   */
  get isLoggedInNow(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user !== null && user['token']
  }


  /**
   * check login in token on API-Endpoint user.
   * @param token
   * @returns
   */
  checkToken(token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `token ${token}`
    });
    const requestOptions = { headers: headers };
    return this.HttpRequest.get<User>('https://join-backend-2101.herokuapp.com/api/auth/user', requestOptions)
  }


  /**
   * if the token expired than remove user from localstorage and navigate to sign-in.
   */
  sessionExpired() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['sign-in']);
    this.utilityService.alert('Your session has expired.', 5000);
  }


  /**
   * logout the user on API-Endpoint logout.
   */
  logoutUser() {
    this.HttpRequest.post('https://join-backend-2101.herokuapp.com/api/auth/logout', null, { headers: this.setTokenToHeader() }).subscribe(() => {
      localStorage.removeItem('currentUser');
      this.utilityService.alert('Logged out successfully.', 5000);
      this.router.navigate(['sign-in']);
    });
  }


  /**
   * set the token to header for get and post requests.
   * @returns
   */
  setTokenToHeader() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `token ${user['token']}`
      });
      return headers
    }
    return null
  }


  userDefault() {
    return {
      id: 0,
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      is_staff: false,
      is_superuser: false,
      token: ''
    };
  }
}
