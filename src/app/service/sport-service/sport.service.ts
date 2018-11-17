import { Injectable } from '@angular/core';
import { Sport } from '../../model/sport';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageService } from '../message-service/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Place } from 'src/app/model/place';

@Injectable({
  providedIn: 'root'
})

export class SportService {

  sportsUrl = 'sports/';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  private log(message: string) {
    this.messageService.add(`SportService: ${message}`);
  }

  /** Get sports list on the server */
  getSports(): Observable<Sport[]> {
    console.log('urlSport', this.sportsUrl)
    return this.http.get<Sport[]>(this.sportsUrl);
  }
  /** Get sport by id on the server */
  getSport(id: number): Observable<Sport> {
    const url = this.sportsUrl + id;
    return this.http.get<Sport>(url);
  }

  getSportByName(name: String): Observable<Sport> {
    const url = this.sportsUrl + name;
    return this.http.get<Sport>(url);
  }

  /** Get sport by id on the server */
  getSportPlacesList(id: number): Observable<Place[]> {
    const url = this.sportsUrl + id
    return this.http.get<Sport>(url).pipe(map(sport => {
      return sport.places
    }));
  }

  /** PUT: update the sport on the server */
  updateSport(sport: Sport): Observable<Sport> {
    const url = this.sportsUrl + 'update';
    return this.http.put<Sport>(url, sport);
  }

  /** POST: add a new sport to the server */
  addSport(sport: Sport): Observable<Sport> {
    const url = this.sportsUrl + 'create'
    console.log("service ", url)
    return this.http.post(url, sport) as Observable<Sport>;
  }
  // /** DELETE: delete the hero from the server */
  deleteSport(sport: Sport | number): Observable<Sport> {
    const id = typeof sport === 'number' ? sport : sport.id;
    const url = this.sportsUrl + 'delete/' + id;
    return this.http.delete<Sport>(url);
  }


}
