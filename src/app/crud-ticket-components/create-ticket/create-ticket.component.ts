import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Ticket } from 'src/app/shared/interfaces/ticket';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';
import { TicketService } from 'src/app/shared/services/ticket-service/ticket.service';
import { UtilityServiceService } from 'src/app/shared/services/utility-service/utility-service.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})

export class CreateTicketComponent implements OnInit {

  titleFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);

  ticket: Ticket = this.ticketService.ticketDefault();

  constructor(public ticketService: TicketService, public utilityService: UtilityServiceService,
    public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.isAuthenticated();
  }


  createTicket() {
    this.ticketService.createTicket(this.ticket).subscribe(() => {
      this.utilityService.alert('Ticket created successfully.', 5000);
    });
  }
}
