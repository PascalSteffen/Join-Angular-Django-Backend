import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CalendarEventService } from './calendar-event.service';

describe('CalendarEventService', () => {
  let service: CalendarEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule]
    });
    service = TestBed.inject(CalendarEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
