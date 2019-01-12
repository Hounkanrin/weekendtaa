import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SportService } from './service/sport-service/sport.service';
import { PersonService } from './service/person-services/person.service';
import { Person } from './model/person';
import { ChoiceService } from './service/choice-service/choice.service';

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

  private roles: Array<any> = new Array<any>();
  private con_url = '';


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

  login(credentials: any): boolean {
    let auth = false;
    const userKey = btoa(credentials.email + ':' + credentials.password);
    sessionStorage.setItem(this.loginPassSession, userKey);
    this.personService.getPersonEmail(credentials.email).subscribe(user => {
      sessionStorage.clear();
      sessionStorage.setItem(this.sessionId, userKey);
      sessionStorage.setItem(this.sessionUserId, '' + user.id);
      // redirige
      auth = true;
      // this.choiceService.getChoiceByPerson(user.id)
      console.log('je suis connecté');
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
