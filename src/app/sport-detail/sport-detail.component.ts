import { Component, OnInit, Input } from '@angular/core';
import { Sport} from '../sport';
import { from } from 'rxjs';
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { SportService} from '../sport-service/sport.service';

@Component({
  selector: 'app-sport-detail',
  templateUrl: './sport-detail.component.html',
  styleUrls: ['./sport-detail.component.css']
})
export class SportDetailComponent implements OnInit {
//@Input() sport : Sport;
sport: Sport;

  constructor(
    private route: ActivatedRoute,
    private sportService: SportService,
    private location: Location
  ) { }

  ngOnInit(): void  {
    this.getSport();
    //this.goBack();
  }
  getSport(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.sportService.getSport(id)
      .subscribe(sport => this.sport = sport);
  }
  goBack(): void {
    this.location.back();
  }

}
