import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication-service/authentication.service';
import { MessageService } from 'src/app/shared/services/message-service/message.service';
import { TicketService } from 'src/app/shared/services/ticket-service/ticket.service';
import { UtilityServiceService } from 'src/app/shared/services/utility-service/utility-service.service';

@Component({
  selector: 'app-delete-chat-message',
  templateUrl: './delete-chat-message.component.html',
  styleUrls: ['./delete-chat-message.component.scss']
})

export class DeleteChatMessageComponent implements OnInit {

  message: Object;

  constructor(public ticketService: TicketService,
    public messageService: MessageService,
    public utilityService: UtilityServiceService,
    public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.isAuthenticated();
  }

  deleteChatMessage() {
    this.messageService.deleteMessage(this.message['id']).subscribe(() => {
      this.utilityService.alert('Message deleted successfully.', 5000);
    });
  }

}
