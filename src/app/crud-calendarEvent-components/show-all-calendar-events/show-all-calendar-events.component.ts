import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEventService } from 'src/app/shared/services/calendarEvent-service/calendar-event.service';
import { Observable } from 'rxjs';
import { DeleteCalendarEventComponent } from '../delete-calendar-event/delete-calendar-event.component';
import { UtilityServiceService } from 'src/app/shared/services/utility-service/utility-service.service';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';

@Component({
  selector: 'app-show-all-calendar-events',
  templateUrl: './show-all-calendar-events.component.html',
  styleUrls: ['./show-all-calendar-events.component.scss']
})

export class ShowAllCalendarEventsComponent implements OnInit {

  public allCalendarEvents$: Observable<Object[]>;

  constructor(public calendarEventService: CalendarEventService,
    public authenticationService: AuthenticationService,
    public dialog: MatDialog,
    public utilityService: UtilityServiceService) { }

  ngOnInit(): void {
    this.authenticationService.isAuthenticated();
    this.allCalendarEvents$ = this.calendarEventService.getAllCalendarEvents();
    this.calendarEventService.initAllCalendarEvents();
  }

  openDeleteEventDialog(event: Object) {
    const dialogRef = this.dialog.open(DeleteCalendarEventComponent);
    dialogRef.componentInstance.calendarEvent = event;
  }

  showNoYourEventAlert() {
    this.utilityService.alert('You can only delete your own events.', 5000);
  }

}
