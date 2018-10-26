import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Person } from '../../model/person';
import {MessageService} from '../message-service/message.service';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private messageService: MessageService,
    private location: Location,
    private http: HttpClient,
  ) { }

  /** Log a PersonService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PersonService: ${message}`);
  }
    
  private personsUrl = 'persons/';

  /**Methods */
  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.personsUrl);
  }

  getPerson(id: number): Observable<Person>{
    const url = `${this.personsUrl}/${id}`;
    return this.http.get<Person>(url);
  }

  addPerson(person: Person): Observable<Person>{
    const url = `${this.personsUrl}create`;
    console.log("Création en base de données d'une personne", url, person);
    return this.http.post(url, person) as Observable<Person>;
  }

  updatePerson (person: Person): Observable<any> {
    const url = `${this.personsUrl}update`;
    console.log("urlUpdate", `${this.personsUrl}update `)
    return this.http.put<Person>(url, person)
  }
  
  deletePerson (person: Person | number): Observable<Boolean>{
    const id = typeof person === 'number' ? person : person.id;
    const url = `${this.personsUrl}delete/${id}`;

    console.log("urlDelete", url);
    return this.http.delete<Boolean>(url);
  }
  
  goBack(){
    this.location.back();
  }

}
