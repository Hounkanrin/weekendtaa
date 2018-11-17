import {Component, Input, OnInit} from '@angular/core';
import {Place} from '../model/place';
import {ActivatedRoute} from '@angular/router';
import {PlaceService} from '../service/place-service/place.service';
import {PersonService} from '../service/person-services/person.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {

  @Input() place: Place;
  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private personService: PersonService
  ) { }

  ngOnInit() {
    this.getPlace();
  }

  getPlace(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.placeService.getPlace(id)
      .subscribe(place => this.place = place);
  }

  save(): void {
    this.placeService.updatePlace(this.place)
      .subscribe(place => {
        if (place.id > 0) {
          this.goBack();
        }
      });
  }
  goBack(): void {
    this.personService.goBack();
  }
}
