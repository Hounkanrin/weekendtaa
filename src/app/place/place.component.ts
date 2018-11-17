import {Component, Input, OnInit} from '@angular/core';
import { Place } from '../model/place';
import { PlaceService } from '../service/place-service/place.service';
import {log} from 'util';
import {PersonService} from '../service/person-services/person.service';


@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {
  places: Place[];
  @Input() place: Place;
  message: string;
  constructor(private placeService: PlaceService,
              private personService: PersonService
  ) { }

  ngOnInit() {
    this.getPlaces();
  }

  getPlaces(): void {
    this.placeService.getPlaces()
      .subscribe(places => {
        this.places = places;
      });
  }

  update(place: Place) {
    console.log('update', place);
    return this.placeService.updatePlace(place)
      .subscribe(() => this.message = 'Lieu mis à jour');
  }

  deletePlace(place: Place): void {
    console.log('delplace', place);
    this.places = this.places.filter(p => p !== place);
    this.placeService.deletePlace(place).subscribe();
    // this.placeService.deletePlace(this.place.id)
    //   .subscribe(() => this.message = 'Lieu supprimé');
  }

  goBack() {
    this.personService.goBack();
  }
}
