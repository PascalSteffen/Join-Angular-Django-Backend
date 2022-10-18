import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { Ticket } from '../../interfaces/ticket';
@Injectable({
  providedIn: 'root'
})

export class TicketService {
  private allTickets$ = new BehaviorSubject<Ticket[]>([])

  allTicketsLength: number;
  currentDate = new Date().getTime() / 1000;

  constructor(private HttpRequest: HttpClient, private authenticationService: AuthenticationService) { }

  public initAllTickets(): void {
    this.HttpRequest.get<Ticket[]>('https://join-backend-2101.herokuapp.com/api/tickets/',
      { headers: this.authenticationService.setTokenToHeader() }).subscribe(allTickets => {
        this.allTickets$.next(allTickets)
      })
  }

  public getAllTickets(): Observable<Ticket[]> {
    return this.allTickets$;
  }


  createTicket(ticket: Ticket) {
    const body = {
      title: ticket.title,
      date: this.currentDate,
      username: this.authenticationService.currentUserData['username'],
      ticket_message: ticket.ticket_message,
    };
    return this.HttpRequest.post<Ticket[]>(`https://join-backend-2101.herokuapp.com/api/tickets/`,
      body, { headers: this.authenticationService.setTokenToHeader() })
  }


  assignTicket(ticket_id: string) {
    const body = {
      username: this.authenticationService.currentUserData['username']
    };
    return this.HttpRequest.put<Ticket[]>(`https://join-backend-2101.herokuapp.com/api/tickets/${ticket_id}/`,
      body, { headers: this.authenticationService.setTokenToHeader() })
  }


  getCurrentTicket(id: string) {
    return this.HttpRequest.get<Ticket[]>(`https://join-backend-2101.herokuapp.com/api/tickets/${id}/`,
      { headers: this.authenticationService.setTokenToHeader() })
  }


  deleteTicket(id: string) {
    return this.HttpRequest.delete<Ticket[]>(`https://join-backend-2101.herokuapp.com/api/tickets/${id}/`,
      { headers: this.authenticationService.setTokenToHeader() })
  }


  ticketDefault() {
    return {
      id: 0,
      title: '',
      date: this.currentDate,
      from_user: {
        'username': '',
        'first_name': '',
        'last_name': ''
      },
      assigned_to: {
        'username': '',
        'first_name': '',
        'last_name': ''
      },
      ticket_message: ''
    }
  }

}
