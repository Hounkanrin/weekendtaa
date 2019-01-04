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
    private sportService: SportService,
    private location: Location,
    private fb: FormBuilder
  ) { }

  async ngOnInit() {
    this.getChoice();
    // this.personId = this.route.snapshot.paramMap.get('id');

    this.initForm();

    this.sportList = await this.sportService.getSports().toPromise();
    console.log("ffdfdffd ", this.sportList)
    this.f.sport.valueChanges.subscribe(val => {
      this.sportService.getSportPlacesList(val.id as number).subscribe(
        placeList => {
          this.currentSportplacesList = placeList;
        }
      );
    })
  }



  initForm() {

    this.choicesForm = this.fb.group({
      person: this.fb.group({
        id: [this.choice.person.id, Validators.required]
      }),
      sport: this.fb.group({
        id: [this.choice.sport.id, Validators.required],
      }),
      level: this.fb.group({
        id: [this.choice.level.id, Validators.required],
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