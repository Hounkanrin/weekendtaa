import { Component, OnInit } from '@angular/core';
import { Sport } from '../model/sport';
import { Place } from '../model/place';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SportService } from '../service/sport-service/sport.service';
import { PlaceService } from '../service/place-service/place.service';

@Component({
  selector: 'app-add-sport',
  templateUrl: './add-sport.component.html',
  styleUrls: ['./add-sport.component.css']
})
export class AddSportComponent implements OnInit {

  sport: Sport;
  placesList: Place[];
  addSportForm: FormGroup;
  sports: Sport[];


  constructor(private sportService: SportService,
    private placeService: PlaceService,
    private fb: FormBuilder) { }

  async ngOnInit() {
    this.initForm();
    this.placesList = await this.placeService.getPlaces().toPromise();

  }

  initForm() {
    this.addSportForm = this.fb.group({
      name: ['', Validators.required],
      places: []
    })
  }
  addSport(): void {
    if (!(this.sportService.getSportByName(this.addSportForm.value.name))) {
      alert(this.addSportForm.value.name + " existe déjà")
    } else {
      let sport = new Sport();
      const places = this.addSportForm.value.places.map(item => Object.assign({ id: item }));
      this.addSportForm.value.places = places;
      sport = this.addSportForm.value;
      this.sportService.addSport(sport)
        .subscribe(data => {
          this.sportService.getSports();
          this.initForm();
        });
    }

  }

}
