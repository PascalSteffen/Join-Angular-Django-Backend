import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';
import { UserService } from 'src/app/shared/services/user-service/user.service';
import { UtilityServiceService } from 'src/app/shared/services/utility-service/utility-service.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  oldPasswordFormControl = new FormControl('', [Validators.required]);
  newPasswordFormControl = new FormControl('', [Validators.required]);
  hide: boolean = true;

  userData = {
    old_password: '',
    new_password: ''
  }

  constructor(public authenticationService: AuthenticationService, public userService: UserService, public utilityService: UtilityServiceService) { }

  ngOnInit(): void {
    this.authenticationService.isAuthenticated();
  }


  changePassword() {
    this.userService.changePassword(this.userData).subscribe(() => {
      this.authenticationService.logoutUser();
      setTimeout(() => {
        this.utilityService.alert('Your password has been successfully changed.', 5000);
      }, 1000);
    }, error => {
      this.utilityService.alert('The entry of your old password does not match.', 5000);
    })
  }

}
