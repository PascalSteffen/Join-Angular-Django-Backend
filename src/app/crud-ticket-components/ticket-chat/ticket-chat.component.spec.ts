import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

import { TicketChatComponent } from './ticket-chat.component';

describe('TicketChatComponent', () => {
  let component: TicketChatComponent;
  let fixture: ComponentFixture<TicketChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketChatComponent],
      imports: [MatDialogModule, RouterModule.forRoot([]), HttpClientModule, MatSnackBarModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TicketChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
