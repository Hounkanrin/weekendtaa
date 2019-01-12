import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'l\'Application Week End Planning';
  userId: any;
  gretting = {};
  constructor(
    private appService: AppService,
    private http: HttpClient,
    private router: Router) {
    //http.get('resource').subscribe(data => this.gretting = data);
    //this.app.authenticate(undefined);
  }

  ngOnInit() {
    this.userId = sessionStorage.getItem('sessionUser')
    console.log(this.userId)
  }

  getChoiceByPerson(userId) {

  }

  isConnected() {
    return this.appService.isConnected();
  }

  isNotConneted() {
    return this.appService.isNotConnected();
  }

  // isLogout() {
  //   if(this.logout()) {
  //     return true;
  //   }
  // }

  logout() {
    console.log("Je suis deconnectéd");
    return this.appService.logout();
  }


}
