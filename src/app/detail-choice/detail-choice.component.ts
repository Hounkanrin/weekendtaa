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
  choice: Choice;
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
    this.f.sport.valueChanges.subscribe(val => {
      this.sportService.getSportPlacesList(val.id).subscribe(
        placeList => {
          this.currentSportplacesList = placeList;
        }
      );
    })

  }

  initForm() {
    this.getChoice();
    this.choicesForm = this.fb.group({
      id: ['24'],
      person: this.fb.group({
        id: ['22', Validators.required]
      }),
      level: this.fb.group({
        id: ['', Validators.required],
      }),
      sport: this.fb.group({
        id: ['', Validators.required],
      }),
      places: [[Validators.required]]
    })
  }
  getChoice(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.choiceService.getChoice(id)
      .subscribe(choice => {
        this.choice = choice
      });
  }

  updateChoice(): void {
    let choice = new Choice();
    const places = this.choicesForm.value.places.map(item => Object.assign({ id: item }));
    this.choicesForm.value.places = places;
    choice = this.choicesForm.value;
    this.choiceService.updateChoice(choice)
      .subscribe(choices => {
        if (choices.id > 0) {
          this.choiceService.getChoiceByPerson(choices.person.id)
          this.goBack();

        } else {
          // erreur
        }
      });
  }
  goBack(): void {
    this.location.back();
  }

}
