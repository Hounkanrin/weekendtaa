import { Component, OnInit } from '@angular/core';
import { Sport} from '../sport';
import {SPORTS} from '../mock-sports';
import {SportService} from '../sport-service/sport.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {
  
  // sport: Sport;
  sports: Sport [];

  constructor(private sportService: SportService ) { }

  ngOnInit() {
    this.getSports();
  }

  // onSelect(sport: Sport): void {
  //   this.sport = sport;
  // }

  getSports(): void {
    this.sportService.getSports()
        .subscribe(sports => this.sports = sports);
  }

}
