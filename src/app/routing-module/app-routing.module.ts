import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CandidateComponent} from "../components/candidate/candidate.component";
import {CandidatesListComponent} from "../components/candidates-list/candidates-list.component";
import {LoginComponent} from "../components/login/login.component";
import {HomeComponent} from "../components/home/home.component";
import {AuthGuardService} from "../shared/authorization/auth-guard.service";
import {RegisterComponent} from "../components/register/register.component";
import {UserProfileComponent} from "../components/user-profile/user-profile.component";
import {VacanciesComponent} from "../components/vacancies/vacancies.component";
import {MyDashboardComponent} from "../my-dashboard/my-dashboard.component";

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'candidates',
    component: CandidatesListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'candidate-add',
    component: CandidateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'candidate/:id',
    component: CandidateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'vacancies',
    component: VacanciesComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuardService
  ]
})
export class AppRoutingModule {
}
