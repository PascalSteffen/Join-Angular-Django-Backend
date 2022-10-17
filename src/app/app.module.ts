import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SummaryComponent } from './nav-components/summary/summary.component';
import { BoardComponent } from './nav-components/board/board.component';
import { AddTaskComponent } from './nav-components/add-task/add-task.component';
import { ImprintComponent } from './nav-components/imprint/imprint.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PrivacyComponent } from './nav-components/privacy/privacy.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TaskFilterPipe } from './shared/pipes/filter-pipes/task-filter.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskDetailComponent } from './crud-task-components/task-detail/task-detail.component';
import { EditTaskComponent } from './crud-task-components/edit-task/edit-task.component';
import { DeleteTaskComponent } from './crud-task-components/delete-task/delete-task.component';
import { PushTaskComponent } from './crud-task-components/push-task/push-task.component';
import { TaskHistoryComponent } from './nav-components/task-history/task-history.component';
import { SearchfilterPipe } from './shared/pipes/filter-pipes/searchfilter.pipe';
import { SignInComponent } from './auth-components/sign-in/sign-in.component';
import { SignUpComponent } from './auth-components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './auth-components/forgot-password/forgot-password.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditUserComponent } from './user-components/edit-user/edit-user.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TeamComponent } from './nav-components/team/team.component';
import { SetUnsetAdminComponent } from './user-components/set-unset-admin/set-unset-admin.component';
import { SortByPipe } from './shared/pipes/sort-pipes/sort-by.pipe';
import { TicketSystemComponent } from './nav-components/ticket-system/ticket-system.component';
import { MatCardModule } from '@angular/material/card';
import { CreateTicketComponent } from './crud-ticket-components/create-ticket/create-ticket.component';
import { TicketPipe } from './shared/pipes/sort-pipes/ticket.pipe';
import { TicketChatComponent } from './crud-ticket-components/ticket-chat/ticket-chat.component';
import { MatBadgeModule } from '@angular/material/badge';
import { DeleteChatMessageComponent } from './crud-ticket-components/delete-chat-message/delete-chat-message.component';
import { CalendarComponent } from './nav-components/calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AddCalendarEventComponent } from './crud-calendarEvent-components/add-calendar-event/add-calendar-event.component';
import { MatRadioModule } from '@angular/material/radio';
import { EventDetailComponent } from './crud-calendarEvent-components/event-detail/event-detail.component';
import { ShowAllCalendarEventsComponent } from './crud-calendarEvent-components/show-all-calendar-events/show-all-calendar-events.component';
import { DeleteCalendarEventComponent } from './crud-calendarEvent-components/delete-calendar-event/delete-calendar-event.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    BoardComponent,
    AddTaskComponent,
    ImprintComponent,
    PrivacyComponent,
    TaskFilterPipe,
    TaskDetailComponent,
    EditTaskComponent,
    DeleteTaskComponent,
    PushTaskComponent,
    TaskHistoryComponent,
    SearchfilterPipe,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    MainContentComponent,
    EditUserComponent,
    TeamComponent,
    SetUnsetAdminComponent,
    SortByPipe,
    TicketSystemComponent,
    CreateTicketComponent,
    TicketPipe,
    TicketChatComponent,
    DeleteChatMessageComponent,
    CalendarComponent,
    AddCalendarEventComponent,
    EventDetailComponent,
    ShowAllCalendarEventsComponent,
    DeleteCalendarEventComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatRadioModule,
    MatBadgeModule,
    MatCardModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
