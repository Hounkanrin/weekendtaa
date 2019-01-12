import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'the management app for your week-end';
  gretting = {};
  constructor(private appService: AppService, private http: HttpClient, private router: Router) {
  }
  logout() {
    this.appService.logout()
    //console.log("je suis deconnecté ")
    this.router.navigateByUrl('/login');
  }


}
