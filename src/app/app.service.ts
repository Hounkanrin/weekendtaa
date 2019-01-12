import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SportService } from './service/sport-service/sport.service';
import { of, Observable, Subject } from 'rxjs';

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
  private _isAuth: boolean;
  isAuthSubject = new Subject<boolean>;


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
    this._isAuth = false;
    this.emitIsAuth();
    const userKey = btoa(credentials.email + ':' + credentials.password);
    sessionStorage.setItem(this.loginPassSession, userKey);
    this.sportService.getSportForLogin().subscribe(sp => {
      sessionStorage.clear();
      sessionStorage.setItem(this.sessionId, userKey);
      console.log('je suis connecté');
      this._isAuth = true;
      this.emitIsAuth();
    }, err => {
      this._isAuth = false;
      this.emitIsAuth();
    });
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
    this._isAuth = false;
    this.emitIsAuth();
  }

  emitIsAuth() {
    this.isAuthSubject.next(this._isAuth);
  }

}
