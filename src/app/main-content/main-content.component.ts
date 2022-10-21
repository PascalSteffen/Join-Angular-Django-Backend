import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RegisterUserComponent } from '../auth-components/register-user/register-user.component';
import { Ticket } from '../shared/interfaces/ticket';
import { AuthenticationService } from '../shared/services/authentication-service/authentication.service';
import { TicketService } from '../shared/services/ticket-service/ticket.service';
import { EditUserComponent } from '../user-components/edit-user/edit-user.component';
import { PasswordChangeComponent } from '../user-components/password-change/password-change.component';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})

export class MainContentComponent implements OnInit {
  public allTickets$: Observable<Ticket[]>;

  showFiller = false;

  constructor(public dialog: MatDialog,
    public ticketService: TicketService,
    public authenticationService: AuthenticationService) { }


  ngOnInit(): void {
    this.authenticationService.isAuthenticated();
    this.allTickets$ = this.ticketService.getAllTickets();
    this.allTickets$.subscribe(allTickets => {
      this.ticketService.allTicketsLength = allTickets.length;
    })
    this.ticketService.initAllTickets();
  }


  openEditUser() {
    const dialogRef = this.dialog.open(EditUserComponent);
  }


  registerNewUser() {
    const dialogRef = this.dialog.open(RegisterUserComponent);
  }


  changeUserPassword() {
    const dialogRef = this.dialog.open(PasswordChangeComponent);
  }

}
