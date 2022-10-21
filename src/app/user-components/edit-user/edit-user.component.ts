import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';
import { UserService } from 'src/app/shared/services/user-service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  usernameFormControl = new FormControl('', [Validators.required]);

  constructor(public authenticationService: AuthenticationService, public userService: UserService) { }

  ngOnInit(): void {
    this.authenticationService.isAuthenticated();
  }

  updateUser() {
    this.userService.updateUser(this.authenticationService.currentUserData).subscribe(() => {
      this.authenticationService.logoutUser();
    });
  }

}
