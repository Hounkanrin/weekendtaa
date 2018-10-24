import { Component, OnInit } from '@angular/core';


import {Choice} from '../model/choice';
import {ChoiceService} from '../service/choice-service/choice.service';


@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnInit {
  choices: Choice[];
  constructor(private choiceService: ChoiceService) { }

  ngOnInit() {
    this.getChoices();
  }

  getChoices(): void {
    this.choiceService.getChoices()
      .subscribe(choices => {
        this.choices = choices;
      });
  }

}
