import { Component, OnInit } from '@angular/core';
import { Person } from '../model/person';
import {PersonService} from '../service/person-services/person.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  persons: Person[] = [];
  newPerson: Person = new Person();

  constructor(
    private personService: PersonService
  ) { }

  ngOnInit() {
  }

  addPerson(){
    this.personService.addPerson(this.newPerson)
      .subscribe(person => {
        console.log("newPersonId", person.id);
        if(person.id == null){
          return;
        }
      });

  }
}
