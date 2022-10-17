import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../../interfaces/message';
import { AuthenticationService } from '../authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  private allTicketMessages$ = new BehaviorSubject<Message[]>([])
  currentDate = new Date().getTime() / 1000;

  constructor(private HttpRequest: HttpClient, private authenticationService: AuthenticationService) { }

  public initAllTicketMessages(id: string): void {
    this.HttpRequest.get<Message[]>(`https://join-backend-21012101.herokuapp.com/api/messages/?ticket_id=${id}`,
      { headers: this.authenticationService.setTokenToHeader() }).subscribe(allTicketMessages => {
        this.allTicketMessages$.next(allTicketMessages)
      })
  }


  public getAllTicketMessages(): Observable<Message[]> {
    return this.allTicketMessages$;
  }


  createMessage(message: string, ticket_id: string) {
    const body = {
      id: ticket_id,
      date: this.currentDate,
      chat_message: message
    };
    return this.HttpRequest.post<Message[]>(`https://join-backend-21012101.herokuapp.com/api/messages/`,
      body, { headers: this.authenticationService.setTokenToHeader() })
  }


  deleteMessage(id: string) {
    return this.HttpRequest.delete<Message[]>(`https://join-backend-21012101.herokuapp.com/api/messages/${id}/`,
      { headers: this.authenticationService.setTokenToHeader() })
  }


  messageDefault() {
    return {
      id: 0,
      ticket_id: 0,
      date: this.currentDate,
      chat_message: '',
      from_user: {
        'username': '',
        'first_name': '',
        'last_name': ''
      },

    }
  }

}
