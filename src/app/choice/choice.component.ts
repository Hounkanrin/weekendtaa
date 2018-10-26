import { Component, OnInit } from '@angular/core';
import {Choice} from '../model/choice';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnInit {
  choices: Choice[];
  constructor() { }

  ngOnInit() {
  }

}
