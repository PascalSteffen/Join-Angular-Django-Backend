import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  userdata = {
    email: '',
  }
  hide = true;

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
