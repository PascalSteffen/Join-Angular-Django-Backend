import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces/AuthResData';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';
import { UserService } from 'src/app/shared/services/user-service/user.service';
import { SetUnsetAdminComponent } from 'src/app/user-components/set-unset-admin/set-unset-admin.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})

export class TeamComponent implements OnInit {

  public allUsers$: Observable<User[]>
  name: string;
  loading: boolean = false;

  constructor(public dialog: MatDialog,
    public authenticationService: AuthenticationService,
    public userService: UserService) { }


  ngOnInit(): void {
    this.authenticationService.isAuthenticated();
    this.allUsers$ = this.userService.getAllUsers()
    this.allUsers$.subscribe(() => {
      setTimeout(() => {
        this.loading = true;
      }, 500);
    })
    this.userService.initAllUsers();
  }


  /**
   * update all admins and push the current id's in the dialog.
   * @param user
   */
  openSetUnsetAdminDialog(user: any) {
    const dialogRef = this.dialog.open(SetUnsetAdminComponent);
    dialogRef.componentInstance.user = user
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
}
