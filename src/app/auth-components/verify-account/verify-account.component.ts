import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {
  tokenFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  userdata = {
    password: '',
    token: '',
  }

  hide: boolean = true;

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
