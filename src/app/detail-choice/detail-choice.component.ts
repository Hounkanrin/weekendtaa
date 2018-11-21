import { Component, OnInit, Input } from '@angular/core';
import { Choice } from '../model/choice';
import { ActivatedRoute } from '@angular/router';
import { ChoiceService } from '../service/choice-service/choice.service';
import { Location } from '@angular/common';
import { Person } from '../model/person';
import { Sport } from '../model/sport';
import { Place } from '../model/place';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Level } from '../model/level';
import { SportService } from '../service/sport-service/sport.service';
@Component({
  selector: 'app-detail-choice',
  templateUrl: './detail-choice.component.html',
  styleUrls: ['./detail-choice.component.css']
})
export class DetailChoiceComponent implements OnInit {
  @Input() choice: Choice;
  personId: Person;
  sportList: Sport[];
  currentSportplacesList: Place[];
  sportPlace: Sport;
  choicesForm: FormGroup;
  sport: Sport;
  level: Level;

  get f() {
    return this.choicesForm.controls;
  }
  constructor(
    private route: ActivatedRoute,
    private choiceService: ChoiceService,
    private location: Location,
    private sportService: SportService,
    private fb: FormBuilder
  ) { }

  async ngOnInit() {
    this.initForm();
    this.sportList = await this.sportService.getSports().toPromise();
    //this.placesList = await this.placeService.getPlaces().toPromise();
    this.f.sport.valueChanges.subscribe(val => {
      this.sportService.getSportPlacesList(val).subscribe(
        placeList => {
          this.currentSportplacesList = placeList;
        }
      );
    })

  }

  initForm() {
    this.getChoice();
    this.choicesForm = this.fb.group({
      person: this.fb.group({
        id: [this.choice.person, Validators.required]
      }),
      sport: this.fb.group({
        id: [this.choice.sport, Validators.required],
      }),
      level: this.fb.group({
        id: [this.choice.level, Validators.required],
      }),
      places: [[this.choice.places], Validators.required]
    })
  }
  getChoice(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.choiceService.getChoice(id)
      .subscribe(choice => {
        console.log(choice);
        this.choice = choice
      });
  }

  updateChoice(): void {
    console.log("choix", this.choicesForm.value);
    let choice = new Choice();
    const places = this.choicesForm.value.places.map(item => Object.assign({ id: item }));
    choice = this.choicesForm.value;
    this.choiceService.updateChoice(choice)
      .subscribe(choice => {
        if (choice.id > 0) {
          this.choiceService.getChoiceByPerson(choice.person.id)

        } else {
          // erreur
        }
      });
  }
  goBack(): void {
    this.location.back();
  }

}
