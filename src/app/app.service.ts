import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SportService } from './service/sport-service/sport.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private def_user = 'vivi@gmail.com';
  private def_pass = 'viviane';
  public loginPassSession = 'loginPassSession';
  public sessionId = 'sessionID';
  private con_url = '';

  constructor(private http: HttpClient, private sportService: SportService) { }

  getDefUser(): string {
    return this.def_user;
  }

  getDefPass(): string {
    return this.def_pass;
  }

  getUrlForLogin(): string {
    return 'sports/forLogin';
  }

  login(credentials: any) {
    const userKey = btoa(credentials.email + ':' + credentials.password);
    sessionStorage.setItem(this.loginPassSession, userKey);
    this.sportService.getSportForLogin().subscribe(sp => {
      sessionStorage.clear();
      sessionStorage.setItem(this.sessionId, userKey);
      // redirige
      console.log('je suis connecté');
    }, error => {
      console.log(error);
    });
  }

  isConnected(): boolean {
    const userKey = sessionStorage.getItem(this.sessionId);
    return userKey && userKey.length > 0;
  }

}
