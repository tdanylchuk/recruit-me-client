import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {CandidatesService} from "./shared/candidates/candidates.service";
import {CandidatesListComponent} from './components/candidate-dashboard/candidates-list/candidates-list.component';
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
import {CommentsComponent} from './components/comments/comments.component';
import {AttachmentsComponent} from './components/attachments/attachments.component';
import {CommentService} from "./shared/comment/comment.service";
import {ActivityFeedComponent} from './components/activity-feed/activity-feed.component';
import {ActivityService} from "./shared/activity/activity.service";
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {UserService} from "./shared/user/user.service";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ErrorInterceptor} from "./shared/http-interceptor/error-interceptor";
import {VacanciesComponent} from './components/vacancies/vacancies.component';
import {CandidateEditComponent} from './components/candidate/candidate-edit/candidate-edit.component';
import {CandidateDashboardComponent} from './components/candidate-dashboard/candidate-dashboard.component';
import {CandidateAddComponent} from './components/candidate-dashboard/candidate-add/candidate-add.component';
import {EmployeeDashboardComponent} from "./components/employee-dashboard/employee-dashboard.component";
import {EmployeeAddComponent} from "./components/employee-dashboard/employee-add/employee-add.component";
import {EmployeeEditComponent} from "./components/employee/employee-edit/employee-edit.component";
import {EmployeeComponent} from "./components/employee/employee.component";
import {EmployeeListComponent} from "./components/employee-dashboard/employee-list/employee-list.component";

import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from "@angular/material";
import {EmployeeService} from "./shared/employee/employee.service";
import {CompensationComponent} from "./components/employee/compensation/compensation.component";
import {CompensationService} from "./shared/compensation/compensation.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    RepeatPasswordValidatorDirective,
    CommentsComponent,
    AttachmentsComponent,
    ActivityFeedComponent,
    UserProfileComponent,
    VacanciesComponent,
    CandidateComponent,
    CandidateEditComponent,
    CandidateAddComponent,
    CandidateDashboardComponent,
    CandidatesListComponent,
    EmployeeComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    EmployeeDashboardComponent,
    EmployeeListComponent,
    CompensationComponent
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
    FlexLayoutModule,
    MatDialogModule,
    MatExpansionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule
  ],
  providers: [
    CandidatesService,
    AttachmentService,
    AuthorizationService,
    CommentService,
    ActivityService,
    UserService,
    EmployeeService,
    CompensationService,
    {provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
