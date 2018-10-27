import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Choice } from '../../model/choice';

@Injectable({
  providedIn: 'root'
})
export class ChoiceService {

  choicesUrl = 'choices';

  constructor(
    private http: HttpClient,
  ) { }

  /** Get sports list on the server */
  getChoices(): Observable<Choice[]> {
    const url = this.choicesUrl + '/';
    return this.http.get<Choice[]>(url);
  }
  getChoice(id: number): Observable<Choice> {
    const url = this.choicesUrl + '/' + id.toString();
    return this.http.get<Choice>(url);
  }
}
