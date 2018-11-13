import { Component, OnInit } from '@angular/core';
import { Sport } from '../model/sport';
import { SportService } from '../service/sport-service/sport.service';
import {PersonService} from '../service/person-services/person.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {
  /* sport: Sport;*/
  sports: Sport[];
  message: string;
  constructor(
    private sportService: SportService,
    private personService: PersonService,
  ) {
  }

  ngOnInit() {
    this.getSports();
  }

  // onSelect(sport: Sport): void {
  //   this.sport = sport;
  // }

  getSports(): void {
    this.sportService.getSports()
      .subscribe(sports => {
        this.sports = sports;
      });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.sportService.addSport({ name } as Sport)
      .subscribe(sport => {
        this.sports.push();
        this.getSports();
      });
  }

  update(sport: Sport) {
    console.log('update', sport);
    return this.sportService.updateSport(sport)
      .subscribe(() => this.message = 'Sport mis à jour.');
  }

  delete(sport: Sport): void {
    this.sports = this.sports.filter(s => s !== sport);
    this.sportService.deleteSport(sport).subscribe();
  }

  goBack() {
    this.personService.goBack();
  }
}
