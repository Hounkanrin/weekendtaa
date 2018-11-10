import { Component, OnInit } from '@angular/core';
import { Person } from '../model/person';
import { Sport } from '../model/sport';
import { Place } from '../model/place';
import { ChoiceService } from '../service/choice-service/choice.service';
import { ActivatedRoute } from '@angular/router';
import { Choice } from '../model/choice';

@Component({
  selector: 'app-choice-person',
  templateUrl: './choice-person.component.html',
  styleUrls: ['./choice-person.component.css']
})
export class ChoicePersonComponent implements OnInit {

  person: Person;
  sport: Sport;
  // currentSportplacesList: Place[];
  places: Place[];
  choices: Choice;
  constructor(
    private choiceService: ChoiceService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getChoiceByPerson();
  }


  getChoiceByPerson(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.choiceService.getChoiceByPerson(this.person.id);
    //.subscribe(choice => this.choices = choice)
  }


}
