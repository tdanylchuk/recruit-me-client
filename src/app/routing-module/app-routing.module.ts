import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CandidateEditComponent} from "../candidate-edit/candidate-edit.component";
import {CandidatesListComponent} from "../candidates-list/candidates-list.component";
import {LoginComponentComponent} from "../login-component/login-component.component";
import {HomeComponent} from "../home/home.component";
import {AuthGuardService} from "../shared/authorization/auth-guard.service";

const appRoutes: Routes = [
  // {
  //   path: '**',
  //   redirectTo: ''
  // },
  {
    path: 'login',
    component: LoginComponentComponent
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
    path: 'candidate-list',
    component: CandidatesListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'candidate-add',
    component: CandidateEditComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'candidate-edit/:id',
    component: CandidateEditComponent,
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
