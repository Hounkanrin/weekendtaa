import { Component, OnInit } from '@angular/core';
import { Sport} from '../selectedSport';
import {Sports} from '../mock-sports';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {
  sports = Sports;
  selectedSport: Sport;

  constructor() { }

  ngOnInit() {

  }
  onSelect(sport: Sport): void {
    this.selectedSport = sport;
  }

}
