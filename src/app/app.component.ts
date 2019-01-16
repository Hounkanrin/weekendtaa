import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  title = 'l\'Application Week End Planning';
  userId: any;
  gretting = {};
  isAuth: boolean;
  isAdmin: boolean;
  isAuthSouscription: Subscription;
  isAdminSouscription: Subscription;

  constructor(
    private appService: AppService,
    private http: HttpClient,
    private router: Router) {
    // http.get('resource').subscribe(data => this.gretting = data);
    // this.app.authenticate(undefined);
  }

  ngOnInit() {
    this.isAuthSouscription = this.appService.isAuthSubject.subscribe(data => {
      this.isAuth = data;
      this.userId = sessionStorage.getItem('sessionUser');
      console.log('userId', this.userId);
    });
    this.isAuthSouscription = this.appService.isAdminSubject.subscribe(metadata => {
      this.isAdmin = metadata;
      console.log('userAdminOrUser', metadata);
    });
  }

  getChoiceByPerson(userId) {
  }

  // isConnected() {
  //   return this.appService.isConnected();
  //   this.isAuthSouscription = this.appService.isAuthSubject.subscribe(data => {
  //     this.isAuth = data;
  //   });
  // }


  logout() {
    console.log('Je suis deconnectéd');
    return this.appService.logout();
  }

  ngOnDestroy() {
    this.isAuthSouscription.unsubscribe();
  }

}
