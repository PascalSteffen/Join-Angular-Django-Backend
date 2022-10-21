import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';
import { UtilityServiceService } from 'src/app/shared/services/utility-service/utility-service.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})

export class RegisterUserComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  usernameFormControl = new FormControl('', [Validators.required]);
  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required]);

  constructor(public authenticationService: AuthenticationService, public utilityService: UtilityServiceService) { }

  userData = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  }


  ngOnInit(): void {
    this.authenticationService.isAuthenticated();
  }


  async registerNewUser() {
    await this.randomPassword();
    this.authenticationService.registerNewUser(this.userData).subscribe(() => {
      this.authenticationService.sendVerification(this.userData).subscribe(() => {
        this.utilityService.alert('User created successfully.', 5000);
      });
    })
  }


  async randomPassword() {
    let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 24;

    for (let i = 0; i <= passwordLength; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      this.userData.password += chars.substring(randomNumber, randomNumber + 1);
    }
  }

}
