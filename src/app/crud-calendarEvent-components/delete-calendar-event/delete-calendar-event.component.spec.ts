import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DeleteCalendarEventComponent } from './delete-calendar-event.component';

describe('DeleteCalendarEventComponent', () => {
  let component: DeleteCalendarEventComponent;
  let fixture: ComponentFixture<DeleteCalendarEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteCalendarEventComponent],
      imports: [HttpClientModule, MatSnackBarModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeleteCalendarEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
