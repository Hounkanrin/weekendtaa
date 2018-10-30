import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place } from './model/place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private placeUrl = 'places'

  constructor(
    private http: HttpClient,
  ) { }

  getPlaces(): Observable<Place[]> {
    const url = this.placeUrl + '/';
    return this.http.get<Place[]>(url);
  }


}
