import { Component, OnInit, Input } from '@angular/core';
import { Choice } from '../model/choice';
import { ActivatedRoute } from '@angular/router';
import { ChoiceService } from '../service/choice-service/choice.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-detail-choice',
  templateUrl: './detail-choice.component.html',
  styleUrls: ['./detail-choice.component.css']
})
export class DetailChoiceComponent implements OnInit {
  @Input() choice: Choice;

  constructor(
    private route: ActivatedRoute,
    private choiceService: ChoiceService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getChoice();
  }
  getChoice(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.choiceService.getChoice(id)
      .subscribe(choice => {
        console.log(choice);
        this.choice = choice
      });
  }
  goBack(): void {
    this.location.back();
  }

}
