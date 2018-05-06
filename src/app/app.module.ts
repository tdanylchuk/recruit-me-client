import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {CandidatesService} from "./shared/candidates/candidates.service";
import {CandidatesListComponent} from './components/candidates-list/candidates-list.component';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CandidateComponent} from './components/candidate/candidate.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AttachmentService} from "./shared/attachments/attachment.service";
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {AuthorizationService} from "./shared/authorization/authorization-service.service";
import {XhrInterceptor} from "./shared/http-interceptor/xhr-interceptor";
import {AuthInterceptor} from "./shared/http-interceptor/auth-interceptor";
import {AppRoutingModule} from "./routing-module/app-routing.module";
import {RegisterComponent} from './components/register/register.component';
import {RepeatPasswordValidatorDirective} from './components/register/repeat-password-validator.directive';
import {CommentsComponent} from './components/candidate/comments/comments.component';
import {AttachmentsComponent} from './components/candidate/attachments/attachments.component';
import {CommentService} from "./shared/comment/comment.service";
import {ActivityFeedComponent} from './components/candidate/activity-feed/activity-feed.component';
import {ActivityService} from "./shared/activity/activity.service";
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {UserService} from "./shared/user/user.service";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ErrorInterceptor} from "./shared/http-interceptor/error-interceptor";
import { VacanciesComponent } from './components/vacancies/vacancies.component';
import { CandidateEditComponent } from './components/candidate/candidate-edit/candidate-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CandidatesListComponent,
    CandidateComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    RepeatPasswordValidatorDirective,
    CommentsComponent,
    AttachmentsComponent,
    ActivityFeedComponent,
    UserProfileComponent,
    VacanciesComponent,
    CandidateEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    RouterModule,
    MatSidenavModule,
    FormsModule,
    MatTooltipModule,
    MatGridListModule,
    MatSnackBarModule,
    MatMenuModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [
    CandidatesService,
    AttachmentService,
    AuthorizationService,
    CommentService,
    ActivityService,
    UserService,
    {provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
