import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

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
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {AttachmentService} from "./shared/attachments/attachment.service";

const appRoutes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/candidate-list',
  //   pathMatch: 'full'
  // },
  {
    path: 'candidate-list',
    component: CandidatesListComponent
  },
  {
    path: 'candidate-add',
    component: CandidateEditComponent
  },
  {
    path: 'candidate-edit/:id',
    component: CandidateEditComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CandidatesListComponent,
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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CandidatesService, AttachmentService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
