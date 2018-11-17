import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place } from '../../model/place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private placeUrl = 'places/';
  constructor(
    private http: HttpClient,
  ) { }

  getPlaces(): Observable<Place[]> {
    const url = this.placeUrl + '/';
    return this.http.get<Place[]>(url);
  }
  getPlace(id: number): Observable<Place> {
    const url = this.placeUrl + '/' + id.toString();
    return this.http.get<Place>(url);
  }

  addPlace(place: Place): Observable<Place> {
    const url = `${this.placeUrl}create`;
    return this.http.post<Place>(url, place);
  }

  updatePlace(place: Place): Observable<Place> {
    // const url = `${this.placeUrl}update`;
    const url = this.placeUrl + '/update';
    console.log('placeToUpddate', place);
    return this.http.put<Place>(url, place);
  }

  deletePlace(place: Place | number): Observable<Boolean> {
    const id = typeof place === 'number' ? place : place.id;
    const url = `${this.placeUrl}delete/${id}`;
    return this.http.delete<Boolean>(url);
  }


}
