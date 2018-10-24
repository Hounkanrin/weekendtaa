import { Injectable } from '@angular/core';
import { Sport } from '../../model/sport';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message-service/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SportService {

  sportsUrl = 'sports';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  private log(message: string) {
    this.messageService.add(`SportService: ${message}`);
  }

  /** Get sports list on the server */
  getSports(): Observable<Sport[]> {
    return this.http.get<Sport[]>(this.sportsUrl);
  }
  /** Get sport by id on the server */
  getSport(id: number): Observable<Sport> {
    const url = this.sportsUrl + '/' + id.toString();
    return this.http.get<Sport>(url);
  }
  /** PUT: update the sport on the server */
  updateSport(sport: Sport): Observable<Sport> {
    const url = this.sportsUrl + '/update';
    return this.http.put<Sport>(url, sport);
  }

  /** POST: add a new sport to the server */
  addSport(sport: Sport): Observable<Sport> {
    const url = this.sportsUrl + '/create'
    return this.http.post(url, sport) as Observable<Sport>;
  }
  // /** DELETE: delete the hero from the server */
  deleteSport(sport: Sport | number): Observable<Sport> {
    const id = typeof sport === 'number' ? sport : sport.id;
    const url = this.sportsUrl + '/delete/' + id;
    return this.http.delete<Sport>(url);
  }

  // getSport(id: number): Observable<Sport> {
  //   this.messageService.add(`SportService: fetched sport id=${id}`);
  //   return of (SPORTS.find(sport => sport.id === id));
  // }
  // getSports(): Observable<Sport[]> {
  //   // TODO: send the message _after_ fetching the sports
  //   this.messageService.add(`SportService: fetched sports`);
  //   return of(SPORTS);
  // }


}
