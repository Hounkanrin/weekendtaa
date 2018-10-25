import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SportsComponent } from './sports/sports.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SportDetailComponent } from './sport-detail/sport-detail.component';
import { ChoiceComponent } from './choice/choice.component';
import { DetailChoiceComponent } from './detail-choice/detail-choice.component';

const routes: Routes = [
  { path: 'sports', component: SportsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: SportDetailComponent },
  { path: 'choices', component: ChoiceComponent },
  { path: 'details/:id', component: DetailChoiceComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
