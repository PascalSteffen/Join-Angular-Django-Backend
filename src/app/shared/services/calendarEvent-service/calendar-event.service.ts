import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { Event } from '../../interfaces/event';

@Injectable({
  providedIn: 'root'
})

export class CalendarEventService {

  private allCalendarEvents$ = new BehaviorSubject<Event[]>([])
  currentDate = new Date().getTime() / 1000;

  constructor(public authenticationService: AuthenticationService, private HttpRequest: HttpClient) { }


  public initAllCalendarEvents(): void {
    this.HttpRequest.get<Event[]>('https://join-backend-2101.herokuapp.com/api/calendar_events/',
      { headers: this.authenticationService.setTokenToHeader() }).subscribe(allTasks => {
        this.allCalendarEvents$.next(allTasks)
      })
  }


  public getAllCalendarEvents(): Observable<Event[]> {
    return this.allCalendarEvents$;
  }


  eventDefault() {
    return {
      title: '',
      color: '',
      from_user: {
        'username': '',
        'first_name': '',
        'last_name': ''
      },
      start_date: this.currentDate,
      end_date: this.currentDate,
    }
  }


  createEvent(event: Event, start_date: Date, end_date: Date) {
    let new_start_date = start_date.getTime() / 1000;
    let new_end_date = end_date.getTime() / 1000;
    const body = {
      title: event.title,
      color: event.color,
      start_date: new_start_date,
      end_date: new_end_date,
    };
    return this.HttpRequest.post<Event[]>('https://join-backend-2101.herokuapp.com/api/calendar_events/',
      body, { headers: this.authenticationService.setTokenToHeader() })
  }


  deleteEvent(id: any) {
    return this.HttpRequest.delete<Event[]>(`https://join-backend-2101.herokuapp.com/api/calendar_events/${id}/`,
      { headers: this.authenticationService.setTokenToHeader() })
  }

}
