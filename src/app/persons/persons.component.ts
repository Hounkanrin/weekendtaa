import { Component, OnInit } from '@angular/core';
import { Person } from '../model/person';
import {PersonService} from '../service/person-services/person.service';

 
@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  persons: Person[];
  person: Person;

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.getPersons();
  }

  getPersons(){
    return this.personService.getPersons()
      .subscribe(persons => this.persons = persons);
  }
}
