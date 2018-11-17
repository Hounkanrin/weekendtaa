import { Component, OnInit } from '@angular/core';
import { Place } from '../model/place';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlaceService } from '../service/place-service/place.service';
import {PersonService} from '../service/person-services/person.service';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css']
})
export class AddPlaceComponent implements OnInit {

  places: Place[] = [];
  newPlace: Place = new Place();
  placeForm: FormGroup;

  constructor(
    private placeService: PlaceService,
    private personService: PersonService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.placeForm = this.fb.group({
      place: this.fb.group({
        name: ['', Validators.required],
      })
    });
  }

  addPlace() {
    console.log('placeForm', this.placeForm.value);
    console.log('name', this.placeForm);
    this.placeService.addPlace(this.placeForm.value.place)
      .subscribe(place => {
        if (place.id === null) {
          alert('La ville existe déjà');
        }
        console.log('newPlaceId', place.name);
        this.placeService.addPlace(place);
        this.goBack();
      });
  }

   goBack() {
    this.personService.goBack();
  }
}
