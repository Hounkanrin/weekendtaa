import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'the management app for your week-end';
  gretting = {};
  constructor(private app: AppService, private http: HttpClient, private router: Router) {
    http.get('resource').subscribe(data => this.gretting = data);
    this.app.authenticate(undefined, undefined);
  }
  // logout() {
  //   this.http.post('logout', {}).finally(() => {
  //     this.app.authenticated = false;
  //     this.router.navigateByUrl('/login');
  //   }).subscribe();
  // }
}
