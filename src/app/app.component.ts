import { Component } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication-service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'join-angular';

  constructor(public authenticationService: AuthenticationService) {
    this.authenticationService.autoLogin();
  }
}
