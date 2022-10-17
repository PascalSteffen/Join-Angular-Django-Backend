import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { TicketSystemComponent } from './ticket-system.component';

describe('TicketSystemComponent', () => {
  let component: TicketSystemComponent;
  let fixture: ComponentFixture<TicketSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketSystemComponent],
      imports: [MatDialogModule, HttpClientModule, MatSnackBarModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TicketSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
