import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './nav-components/add-task/add-task.component';
import { BoardComponent } from './nav-components/board/board.component';
import { ImprintComponent } from './nav-components/imprint/imprint.component';
import { PrivacyComponent } from './nav-components/privacy/privacy.component';
import { SummaryComponent } from './nav-components/summary/summary.component';
import { TaskHistoryComponent } from './nav-components/task-history/task-history.component';
import { SignInComponent } from './auth-components/sign-in/sign-in.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { AuthReverseGuard } from './shared/guard/auth-reverse.guard';
import { TeamComponent } from './nav-components/team/team.component';
import { TicketSystemComponent } from './nav-components/ticket-system/ticket-system.component';
import { TicketChatComponent } from './crud-ticket-components/ticket-chat/ticket-chat.component';
import { CalendarComponent } from './nav-components/calendar/calendar.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/sign-in' },
  { path: 'sign-in', component: SignInComponent, canActivate: [AuthReverseGuard] },
  /*   { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AuthReverseGuard] }, */

  { path: 'summary', component: SummaryComponent, canActivate: [AuthGuard] },
  { path: 'board', component: BoardComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'add-task', component: AddTaskComponent, canActivate: [AuthGuard] },
  { path: 'task-history', component: TaskHistoryComponent, canActivate: [AuthGuard] },
  { path: 'team', component: TeamComponent, canActivate: [AuthGuard] },
  { path: 'tickets', component: TicketSystemComponent, canActivate: [AuthGuard] },
  { path: 'tickets/:id', component: TicketChatComponent, canActivate: [AuthGuard] },
  { path: 'imprint', component: ImprintComponent, canActivate: [AuthGuard] },
  { path: 'privacy', component: PrivacyComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
