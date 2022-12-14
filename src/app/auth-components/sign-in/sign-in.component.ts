import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  hide = true;

  userdata = {
    username: '',
    password: ''
  }


  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit(): void {

  }

}
