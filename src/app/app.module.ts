import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';


import { AppComponent } from './app.component';
import { SportsComponent } from './sports/sports.component';
import { SportDetailComponent } from './sport-detail/sport-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { from } from 'rxjs';
import { SportService } from './sport-service/sport.service';
import { HttpRequestIntercept } from './httpRequestInterceptor';
import { ChoiceComponent } from './choice/choice.component';
import { ChoiceService } from './choice-service/choice.service';
import { PersonsComponent } from './persons/persons.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    SportsComponent,
    SportDetailComponent,
    MessagesComponent,
    DashboardComponent,
    PersonsComponent,
    AddPersonComponent,
    PersonDetailComponent,
    //ChoiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false})
  ],
  providers: [SportService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestIntercept,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
