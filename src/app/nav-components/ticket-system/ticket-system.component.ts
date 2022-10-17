import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CreateTicketComponent } from 'src/app/crud-ticket-components/create-ticket/create-ticket.component';
import { Ticket } from 'src/app/shared/interfaces/ticket';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';
import { TicketService } from 'src/app/shared/services/ticket-service/ticket.service';
import { UserService } from 'src/app/shared/services/user-service/user.service';
import { UtilityServiceService } from 'src/app/shared/services/utility-service/utility-service.service';

@Component({
  selector: 'app-ticket-system',
  templateUrl: './ticket-system.component.html',
  styleUrls: ['./ticket-system.component.scss']
})

export class TicketSystemComponent implements OnInit {

  public allTickets$: Observable<Ticket[]>;
  name: string;
  loading: boolean = false;

  constructor(public dialog: MatDialog,
    public userService: UserService,
    public ticketService: TicketService,
    public router: Router,
    public utilityService: UtilityServiceService,
    public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.isAuthenticated();
    this.allTickets$ = this.ticketService.getAllTickets();
    this.allTickets$.subscribe(allTickets => {
      this.ticketService.allTicketsLength = allTickets.length;
      setTimeout(() => {
        this.loading = true;
      }, 500);
    })
    this.ticketService.initAllTickets();
  }


  openCreateTicketDialog() {
    const dialogRef = this.dialog.open(CreateTicketComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.allTickets$ = this.ticketService.getAllTickets();
      this.allTickets$.subscribe(allTickets => {
        this.ticketService.allTicketsLength = allTickets.length;
      })
      this.ticketService.initAllTickets();
    });
  }


  /**
   * open current ticket. A admin can open all tickets, but not a normal user.
   * @param ticketUser
   * @param ticketRoute
   */
  openTicket(ticketUser: string, ticketRoute: string) {
    if (ticketUser == this.authenticationService.currentUserData.username ||
      this.authenticationService.currentUserData.username && this.authenticationService.currentUserData.is_staff) {
      this.router.navigate(['tickets/' + ticketRoute], {
        skipLocationChange: true
      });
    } else {
      this.utilityService.alert('You do not have enough rights for this ticket.', 5000);
    }
  }

}
