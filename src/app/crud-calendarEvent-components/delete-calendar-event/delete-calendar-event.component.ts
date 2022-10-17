import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';
import { CalendarEventService } from 'src/app/shared/services/calendarEvent-service/calendar-event.service';
import { UtilityServiceService } from 'src/app/shared/services/utility-service/utility-service.service';

@Component({
  selector: 'app-delete-calendar-event',
  templateUrl: './delete-calendar-event.component.html',
  styleUrls: ['./delete-calendar-event.component.scss']
})

export class DeleteCalendarEventComponent implements OnInit {
  public allCalendarEvents$: Observable<Object[]>;

  calendarEvent: Object;

  constructor(public calendarEventService: CalendarEventService,
    public utilityService: UtilityServiceService,
    public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.isAuthenticated();
  }


  deleteEvent() {
    this.calendarEventService.deleteEvent(this.calendarEvent['id']).subscribe(() => {
      this.allCalendarEvents$ = this.calendarEventService.getAllCalendarEvents();
      this.calendarEventService.initAllCalendarEvents();
      this.utilityService.alert('Event deleted successfully.', 5000)
    })
  }

}
