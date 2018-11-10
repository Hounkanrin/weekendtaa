import { Component, OnInit } from '@angular/core';
import { Person } from '../model/person';
import { Sport } from '../model/sport';
import { Place } from '../model/place';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonService } from '../service/person-services/person.service';
import { SportService } from '../service/sport-service/sport.service';
import { PlaceService } from '../service/place-service/place.service';
import { ChoiceService } from '../service/choice-service/choice.service';
import { Choice } from '../model/choice';

@Component({
  selector: 'app-add-choice',
  templateUrl: './add-choice.component.html',
  styleUrls: ['./add-choice.component.css']
})
export class AddChoiceComponent implements OnInit {


  persons: Person;
  sportList: Sport[];
  currentSportplacesList: Place[];
  sportPlace: Sport;
  choiceForm: FormGroup;

  get f() {
    return this.choiceForm.controls;
  }
  constructor(
    private personService: PersonService,
    private sportService: SportService,
    private choiceService: ChoiceService,
    private fb: FormBuilder
  ) { }

  async ngOnInit() {
    this.initForm();
    this.sportList = await this.sportService.getSports().toPromise();
    this.f.sport.valueChanges.subscribe(val => {
      this.sportService.getSportPlacesList(val.id as number).subscribe(
        placeList => {
          this.currentSportplacesList = placeList;
        }
      );
    })
  }

  initForm() {
    this.choiceForm = this.fb.group({
      person: this.fb.group({
        id: ['1', Validators.required]
      }),
      sport: this.fb.group({
        id: ['', Validators.required],
      }),
      level: this.fb.group({
        id: ['', Validators.required],
      }),
      places: [[], Validators.required]
    })

  }

  addChoice() {
    console.log(this.choiceForm.value);
    let choice = new Choice();
    const places = this.choiceForm.value.places.map(item => Object.assign({ id: item }));
    this.choiceForm.value.places = places;
    choice = this.choiceForm.value;
    this.choiceService.addChoice(choice)
      .subscribe(data => {
        this.initForm();

      })

  }

}
