import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Event } from 'src/app/shared/interfaces/event';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';
import { UtilityServiceService } from 'src/app/shared/services/utility-service/utility-service.service';
import { CalendarEventService } from '../../shared/services/calendarEvent-service/calendar-event.service';

@Component({
  selector: 'app-add-calendar-event',
  templateUrl: './add-calendar-event.component.html',
  styleUrls: ['./add-calendar-event.component.scss']
})

export class AddCalendarEventComponent implements OnInit {
  titleFormControl = new FormControl('', [Validators.required]);
  startDateFormControl = new FormControl('', [Validators.required]);
  endDateFormControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);

  calendarEvent: Event = this.calendarEventService.eventDefault();
  start_date: Date;
  end_date: Date;

  constructor(public calendarEventService: CalendarEventService,
    public authenticationService: AuthenticationService,
    public utilityService: UtilityServiceService) { }

  ngOnInit(): void {
    this.authenticationService.isAuthenticated();
  }

  createEvent() {
    this.calendarEventService.createEvent(this.calendarEvent, this.start_date, this.end_date).subscribe(() => {
      this.utilityService.alert('Event created successfully.', 5000);
    })
  }

}
