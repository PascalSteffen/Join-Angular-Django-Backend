import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Message } from 'src/app/shared/interfaces/message';
import { Ticket } from 'src/app/shared/interfaces/ticket';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';
import { MessageService } from 'src/app/shared/services/message-service/message.service';
import { TicketService } from 'src/app/shared/services/ticket-service/ticket.service';
import { UtilityServiceService } from 'src/app/shared/services/utility-service/utility-service.service';
import { DeleteChatMessageComponent } from '../delete-chat-message/delete-chat-message.component';

@Component({
  selector: 'app-ticket-chat',
  templateUrl: './ticket-chat.component.html',
  styleUrls: ['./ticket-chat.component.scss']
})

export class TicketChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  descriptionFormControl = new FormControl('', [Validators.required]);

  public allTicketMessages$: Observable<Message[]>;
  allChatMessages: Object[] = [];
  ticket: Ticket[];

  ticketId: string;
  newMessage: string;
  loading: boolean = false;


  constructor(private route: ActivatedRoute,
    public ticketService: TicketService,
    public dialog: MatDialog,
    public utilityService: UtilityServiceService,
    public authenticationService: AuthenticationService,
    public messageService: MessageService,
    public router: Router) { }


  ngOnInit(): void {
    this.authenticationService.isAuthenticated();
    this.route.paramMap.subscribe(async (paramMap) => {
      this.ticketId = paramMap.get('id');
      this.getCurrentTicket()
      this.updateMessages();
      setTimeout(() => {
        this.loading = true;
      }, 500);
    })
    this.scrollToBottom();
  }


  getCurrentTicket() {
    this.ticketService.getCurrentTicket(this.ticketId).subscribe(currentTicket => {
      this.ticket = currentTicket
    })
  }


  deleteTicket() {
    this.ticketService.deleteTicket(this.ticketId).subscribe(() => {
      this.utilityService.alert('Ticket closed successfully.', 5000);
      this.router.navigate(['tickets']);
    })
  }


  createMessage() {
    this.messageService.createMessage(this.newMessage, this.ticketId).subscribe(() => {
      this.newMessage = '';
      this.getCurrentTicket();
      this.updateMessages();
    })
  }


  updateMessages() {
    this.allTicketMessages$ = this.messageService.getAllTicketMessages();
    this.allTicketMessages$.subscribe(response => {
      this.allChatMessages = response;
    })
    this.messageService.initAllTicketMessages(this.ticketId);
  }


  assignToAdmin() {
    this.ticketService.assignTicket(this.ticketId).subscribe(() => {
      this.utilityService.alert('You have successfully accepted the ticket.', 5000);
      this.getCurrentTicket()
    })

  }


  /**
   * scroll auto to bottom in chat.
   */
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }


  ngAfterViewChecked() {
    this.scrollToBottom();
  }


  showNoYourMessageAlert() {
    this.utilityService.alert('You can only delete your own messages.', 5000);
  }


  firstTicketMessageAlert() {
    this.utilityService.alert('The message created on the ticket cannot be deleted.', 5000);
  }


  openDeleteMessageDialog(message: Object) {
    const dialogRef = this.dialog.open(DeleteChatMessageComponent);
    dialogRef.componentInstance.message = message;
    dialogRef.afterClosed().subscribe(() => {
      this.getCurrentTicket();
      this.updateMessages();
    });
  }

}
