import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { Observable } from 'rxjs';
import { Choice } from '../choice';

@Injectable({
  providedIn: 'root'
})
export class ChoiceService {

  choicesUrl = 'choices';

  constructor(
    private http: HttpClient,
  ) { }

  /** Get sports list on the server */
  // getChoices(): Observable<Choice[]> {

  // }
}
