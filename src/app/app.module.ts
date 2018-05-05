import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {CandidatesService} from "./shared/candidates/candidates.service";
import {CandidatesListComponent} from './candidates-list/candidates-list.component';
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
import {CandidateEditComponent} from './candidate-edit/candidate-edit.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AttachmentService} from "./shared/attachments/attachment.service";
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthorizationService} from "./shared/authorization/authorization-service.service";
import {XhrInterceptor} from "./shared/http-interceptor/xhr-interceptor";
import {AuthInterceptor} from "./shared/http-interceptor/auth-interceptor";
import {AppRoutingModule} from "./routing-module/app-routing.module";
import {RegisterComponent} from './register/register.component';
import {RepeatPasswordValidatorDirective} from './register/repeat-password-validator.directive';
import {CommentsComponent} from './candidate-edit/comments/comments.component';
import {AttachmentsComponent} from './candidate-edit/attachments/attachments.component';
import {CommentService} from "./shared/comment/comment.service";
import {ActivityFeedComponent} from './candidate-edit/activity-feed/activity-feed.component';
import {ActivityService} from "./shared/activity/activity.service";
import {UserProfileComponent} from './user-profile/user-profile.component';
import {UserService} from "./shared/user/user.service";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    AppComponent,
    CandidatesListComponent,
    CandidateEditComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    RepeatPasswordValidatorDirective,
    CommentsComponent,
    AttachmentsComponent,
    ActivityFeedComponent,
    UserProfileComponent
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
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
