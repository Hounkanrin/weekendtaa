import { Component, OnInit } from '@angular/core';
import { Place } from '../model/place';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlaceService } from '../service/place-service/place.service';

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
    })
  }

  addPlace() {
    this.placeService.addPlace(this.placeForm.value.place)
      .subscribe(place => {
        console.log("newPlaceId", place.name);
        // if (place.name === null) {
        //   return
        // } else {
        //   let place = new Place();
        //   place = this.placeForm.value;

        //   this.placeService.addPlace(place)
        //     .subscribe(data => {
        //       console.log("new place", data);
        //       this.initForm();
        //     })
        // }
      })
  }
}
