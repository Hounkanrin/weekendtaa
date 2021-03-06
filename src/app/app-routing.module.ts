import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SportsComponent } from './sports/sports.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SportDetailComponent } from './sport-detail/sport-detail.component';
import { PersonsComponent } from './persons/persons.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { ChoiceComponent } from './choice/choice.component';
import { DetailChoiceComponent } from './detail-choice/detail-choice.component';
import { PlaceComponent } from './place/place.component';
import { UpdatePersonComponent } from './update-person/update-person.component';
import { AddChoiceComponent } from './add-choice/add-choice.component';
import { ChoicePersonComponent } from './choice-person/choice-person.component';
import { LoginComponent } from './login/login.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { PlaceDetailComponent } from './place-detail/place-detail.component';
import { AddSportComponent } from './add-sport/add-sport.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sports', component: SportsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: SportDetailComponent },
  { path: 'persons', component: PersonsComponent },
  { path: 'person-detail/:id', component: PersonDetailComponent },
  { path: 'update-person/:id', component: UpdatePersonComponent },
  { path: 'add-person', component: AddPersonComponent },
  { path: 'choices', component: ChoiceComponent },
  { path: 'details/:id', component: DetailChoiceComponent },
  { path: 'places', component: PlaceComponent },
  { path: 'add-choice/:id', component: AddChoiceComponent },
  { path: 'choice-person/:id', component: ChoicePersonComponent },
  { path: 'add-place', component: AddPlaceComponent },
  { path: 'place-detail/:id', component: PlaceDetailComponent },
  { path: 'add-sport', component: AddSportComponent }
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
