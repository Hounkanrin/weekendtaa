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

  /** Get choice list on the server */
  getChoices(): Observable<Choice[]> {
    const url = this.choicesUrl + '/';
    return this.http.get<Choice[]>(url);
  }
  getChoice(id: number): Observable<Choice> {
    const url = this.choicesUrl + '/' + id.toString();
    return this.http.get<Choice>(url);
  }
  addChoice(choice: Choice): Observable<Choice> {
    const url = this.choicesUrl + '/create'
    return this.http.post(url, choice) as Observable<Choice>;
  }
  deleteChoice(choice: Choice | number): Observable<Choice> {
    const id = typeof choice === 'number' ? choice : choice.id;
    const url = this.choicesUrl + '/delete/' + id;
    return this.http.delete<Choice>(url);
  }
  getChoiceByPerson(id: number): Observable<Choice> {
    const url = `${this.choicesUrl}/person/${id}`;
    return this.http.get<Choice>(url);
  }

  updateChoice(choice: Choice): Observable<Choice> {
    const url = this.choicesUrl + '/update';
    return this.http.put<Choice>(url, choice);
  }

}
