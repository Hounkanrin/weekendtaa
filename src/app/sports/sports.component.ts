import { Component, OnInit } from '@angular/core';
import { Sport } from '../model/sport';
import { SportService } from '../service/sport-service/sport.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {
  /* sport: Sport;*/
  sports: Sport[];

  constructor(private sportService: SportService) {
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
      });
  }

  delete(sport: Sport): void {
    let confirm = window.confirm("être vous sur de vouloir supprimer ce sport")
    if (confirm == true) {
      this.sports = this.sports.filter(s => s !== sport);
      this.sportService.deleteSport(sport).subscribe();
    }
  }
}
