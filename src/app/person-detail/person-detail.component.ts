import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../model/person';
import { PersonService } from '../service/person-services/person.service';
import { ChoiceService } from '../service/choice-service/choice.service';
import { Choice } from '../model/choice';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  @Input() person: Person;
  message: string;

  choice: Choice;
  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private choiceService: ChoiceService,
  ) { }

  ngOnInit() {
    this.getPerson();
  }

  getPerson(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.personService.getPerson(id)
      .subscribe(person => {
        this.person = person;
      });
  }

  updatePerson(): void {
    this.personService.updatePerson(this.person)
      .subscribe(person => {
        if (person.id > 0) {
          this.goBack();
        }
      });
  }

  // methode a revoir
  deletePerson(): void {
    alert("personne a supprimer");
    this.personService.deletePerson(this.person.id)
      .subscribe(() => this.message = 'Personne supprimée');
    alert("consif");
    this.goBack();
  }

  goBack() {
    console.log();
    this.personService.goBack();
  }

}
