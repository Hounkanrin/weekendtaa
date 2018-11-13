import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../model/person';
import { PersonService } from '../service/person-services/person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  @Input() person: Person;
  message: string;
  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
  ) { }

  ngOnInit() {
    console.log('ngoninit');
    this.getPerson();
  }

  getPerson(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.personService.getPerson(id)
      .subscribe(person => this.person = person);
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
    this.personService.deletePerson(this.person.id)
      .subscribe(() => this.message = 'Personne supprimée');
    this.goBack();
  }

  goBack() {
    console.log();
    this.personService.goBack();
  }

}
