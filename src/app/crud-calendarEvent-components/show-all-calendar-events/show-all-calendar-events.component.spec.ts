import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ShowAllCalendarEventsComponent } from './show-all-calendar-events.component';

describe('ShowAllCalendarEventsComponent', () => {
  let component: ShowAllCalendarEventsComponent;
  let fixture: ComponentFixture<ShowAllCalendarEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowAllCalendarEventsComponent],
      imports: [MatDialogModule, HttpClientModule, MatSnackBarModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ShowAllCalendarEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
