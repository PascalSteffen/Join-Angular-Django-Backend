import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { endOfDay, startOfDay } from 'date-fns';
import { Observable } from 'rxjs';
import { AddCalendarEventComponent } from 'src/app/crud-calendarEvent-components/add-calendar-event/add-calendar-event.component';
import { EventDetailComponent } from 'src/app/crud-calendarEvent-components/event-detail/event-detail.component';
import { ShowAllCalendarEventsComponent } from 'src/app/crud-calendarEvent-components/show-all-calendar-events/show-all-calendar-events.component';
import { Event } from 'src/app/shared/interfaces/event';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';
import { CalendarEventService } from 'src/app/shared/services/calendarEvent-service/calendar-event.service';
import { UtilityServiceService } from 'src/app/shared/services/utility-service/utility-service.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {

  calendarEvent: Event = this.calendarEventService.eventDefault();
  public allCalendarEvents$: Observable<Object[]>;
  events: CalendarEvent[] = [];
  allEventsLength: number;

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  isAuthenticated: boolean;

  constructor(public calendarEventService: CalendarEventService,
    public dialog: MatDialog,
    public utilityService: UtilityServiceService,
    public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.isAuthenticated();
    this.allCalendarEvents$ = this.calendarEventService.getAllCalendarEvents();
    this.allCalendarEvents$.subscribe(allEvents => {
      this.allEventsLength = allEvents.length;
      this.events = [];
      this.eventIteration(allEvents);
    })
    this.calendarEventService.initAllCalendarEvents();
  }


  /**
   * event iteration for the calender infos.
   * @param allEvents
   */
  eventIteration(allEvents: Object[]) {
    for (let i = 0; i < allEvents.length; i++) {
      const title = allEvents[i]['title'];
      const startDate = allEvents[i]['start_date'];
      const convertedStartDate = new Date(startDate).getTime();
      const endDate = allEvents[i]['end_date'];
      const convertedEndDate = new Date(endDate).getTime();
      let color = allEvents[i]['color'];
      if (color == 'Vacation') {
        color = '#EDD94C'
      } else if (color == 'Meeting') {
        color = '#ffa500'
      } else if (color == 'SickLeave') {
        color = '#086582'
      }
      this.eventPush(title, color, convertedStartDate, convertedEndDate);
    }
  }


  /**
   * new calendar event.
   * @param title
   * @param color
   * @param startDate
   * @param endDate
   */
  eventPush(title: string, color: string, startDate: number, endDate: number) {
    this.events.push({
      title: title,
      color: {
        primary: color,
        secondary: color
      },
      start: startOfDay(startDate),
      end: endOfDay(endDate)
    })
  }


  /**
   * show current day with all events.
   * @param param0
   */
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (events.length == 0) {
      this.utilityService.alert('There is no event on this day.', 5000);
    } else {
      const dialogRef = this.dialog.open(EventDetailComponent);
      dialogRef.componentInstance.calendarEvent = events;
    }
  }


  setView(view: CalendarView) {
    this.view = view;
  }


  openCreateCalendarEventDialog() {
    const dialogRef = this.dialog.open(AddCalendarEventComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }


  openAllCalendarEventsDialog() {
    if (this.allEventsLength == 0) {
      this.utilityService.alert('There are currently no events in the calendar. ', 5000);
    } else {
      const dialogRef = this.dialog.open(ShowAllCalendarEventsComponent);
    }
  }

}
