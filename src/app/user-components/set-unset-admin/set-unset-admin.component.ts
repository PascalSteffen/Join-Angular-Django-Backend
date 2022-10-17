import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces/AuthResData';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';
import { UserService } from 'src/app/shared/services/user-service/user.service';
import { UtilityServiceService } from 'src/app/shared/services/utility-service/utility-service.service';

@Component({
  selector: 'app-set-unset-admin',
  templateUrl: './set-unset-admin.component.html',
  styleUrls: ['./set-unset-admin.component.scss']
})

export class SetUnsetAdminComponent implements OnInit {
  public allUsers$: Observable<Object[]>
  user: User;

  constructor(
    public dialog: MatDialog,
    public userService: UserService,
    public authenticationService: AuthenticationService,
    public utilityService: UtilityServiceService) { }


  ngOnInit(): void {
    this.authenticationService.isAuthenticated();
    this.allUsers$ = this.userService.getAllUsers();
    this.userService.initAllUsers();
  }

  setAdmin() {
    this.userService.setAdmin(this.user, true).subscribe(() => {
      this.utilityService.alert('Admin successfully set.', 5000);
    });
  }

  unsetAdmin() {
    this.userService.setAdmin(this.user, false).subscribe(() => {
      this.utilityService.alert('Admin successfully unset.', 5000);
    });
  }

}
