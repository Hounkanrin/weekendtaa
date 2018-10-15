import { Component, OnInit, Input } from '@angular/core';
import { Sport} from '../sport';
import { from } from 'rxjs';
@Component({
  selector: 'app-sport-detail',
  templateUrl: './sport-detail.component.html',
  styleUrls: ['./sport-detail.component.css']
})
export class SportDetailComponent implements OnInit {
@Input() sport : Sport;

  constructor() { }

  ngOnInit() {
  }

}
