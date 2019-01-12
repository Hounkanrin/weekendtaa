import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SportService } from './service/sport-service/sport.service';
import { PersonService } from './service/person-services/person.service';
import { Person } from './model/person';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  person: Person;
  private def_user = 'vivi@gmail.com';
  private def_pass = 'viviane';
  public loginPassSession = 'loginPassSession';
  public sessionId = 'sessionID';
  private con_url = '';


  constructor(private http: HttpClient, private sportService: SportService,
    private personService: PersonService) { }

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
      // redirige
      auth = true;
      // this.person = this.personService.getPersonEmail(credentials.email)
      //this.personService.getPerson(this.person.id)

      console.log('je suis connecté');


    }, error => {
      console.log(error);
    });
    return auth;
  }

  isConnected(): boolean {
    const userKey = sessionStorage.getItem(this.sessionId);
    return userKey && userKey.length > 0;
  }
  logout() {
    sessionStorage.clear();
  }
}
