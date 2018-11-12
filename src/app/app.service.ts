import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  authenticated = false;

  constructor(private http: HttpClient) { }

  authenticate(credentials) {
    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic' + btoa(credentials.username + ':' + credentials.password)
    } : {});
    this.http.get('person', { headers: headers }).subscribe(response => {
      if (response['name']) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
    });
  }
}
