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

  personId: number;
  sport: Sport;
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
    this.personId = +this.route.snapshot.paramMap.get('id');
    this.choiceService.getChoiceByPerson(this.personId)
      .subscribe(choice => {
        this.choices = choice
      })
  }

  deleteChoice(choice: Choice) {
    this.choiceService.deleteChoice(choice).subscribe();
  }

}
