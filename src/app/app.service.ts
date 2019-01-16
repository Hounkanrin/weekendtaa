import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SportService } from './service/sport-service/sport.service';
import { PersonService } from './service/person-services/person.service';
import { Person } from './model/person';
import { ChoiceService } from './service/choice-service/choice.service';
import { of, Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Role } from './model/role';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  person: Person;
  private def_user = 'vivi@gmail.com';
  private def_pass = 'viviane';
  public loginPassSession = 'loginPassSession';
  public sessionUserId = 'sessionUser';
  public sessionId = 'sessionID';

  private con_url = '';
  private _isAuth: boolean;
  private _isAdmin: boolean;
  isAuthSubject = new Subject<boolean>();
  isAdminSubject = new Subject<boolean>();

  constructor(private http: HttpClient, private sportService: SportService,
    private personService: PersonService,
    private choiceService: ChoiceService) { }

  getDefUser(): string {
    return this.def_user;
  }

  getDefPass(): string {
    return this.def_pass;
  }

  getUrlForLogin(): string {
    return 'persons/forLogin';
  }

  login(credentials: any) {
    this._isAuth = false;
    // this._isAdmin = false;
    this.emitIsAuth();
    const userKey = btoa(credentials.email + ':' + credentials.password);
    sessionStorage.setItem(this.loginPassSession, userKey);
    this.personService.getPersonEmail(credentials.email).subscribe(user => {
      sessionStorage.clear();
      sessionStorage.setItem(this.sessionId, userKey);
      sessionStorage.setItem(this.sessionUserId, '' + user.id);
      /*user roles*/
      console.log('user', user);
      console.log('user.role', user.roles);
      const userRoles: Array<Role> = user.roles;
      const userRoleName = userRoles.map(function (role) {
        return role.name;
      });
      console.log('role,', userRoleName);
      /**/
      console.log('je suis connecté');
      this._isAuth = true;
      this._isAdmin = this.isAdmin(userRoles);
      this.emitIsAuth();
      const isConnectedUserAdmin = this.isAdmin(userRoles);
      console.log('isConnectedUserAdmin', isConnectedUserAdmin);
    }, error => {
      this._isAuth = false;
      this.emitIsAuth();
    });
  }

  logout() {
    sessionStorage.clear();
    this._isAuth = false;
    this.emitIsAuth();
  }

  emitIsAuth() {
    this.isAuthSubject.next(this._isAuth);
    this.isAdminSubject.next(this._isAdmin);
  }

  isAdmin(roles: Array<Role>): boolean {
    let roleAdminFound = false;
    roles.forEach(function (role) {
      if (role.name === 'admin') {
        roleAdminFound = true;
      }
    });
    return roleAdminFound;
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

}



