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
  private roles: Array<any> = new Array<any>();
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

  login(credentials: any): boolean {
    let auth = false;
    const userKey = btoa(credentials.email + ':' + credentials.password);
    sessionStorage.setItem(this.loginPassSession, userKey);
    this.sportService.getSportForLogin().subscribe(sp => {
      sessionStorage.clear();
      sessionStorage.setItem(this.sessionId, userKey);
      // redirige
      console.log('je suis connecté');
      auth = true;
    }, error => {
      console.log(error);
    });
    return auth;
  }

  // islogin() {
  //   if (this.login(credentials)) {
  //     return true;
  //   }
  // }
  loadCredentialsUser() {
    return sessionStorage.getItem('token');
  }

  saveCredentialsUser(jwt: string) {
    sessionStorage.setItem('token', jwt);
  }

  isConnected(): boolean {
    const userKey = sessionStorage.getItem(this.sessionId);
    return userKey && userKey.length > 0;
  }

  isNotConnected(): boolean {
    if (sessionStorage.length === 0) {
      return true;
    }
  }

  logout() {
    sessionStorage.clear();
  }

}
