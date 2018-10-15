import { Injectable } from '@angular/core';
import {Sport} from '../sport';
import {SPORTS} from '../mock-sports';
import { Observable, of } from 'rxjs';
import { MessageService} from '../message-service/message.service';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  constructor(private messageService: MessageService) { }

  // getSportes(): Observable<Sport[]> {
  //   return of (SPORTS);
  // }
  
  getSports(): Observable<Sport[]> {
    // TODO: send the message _after_ fetching the sports
    this.messageService.add('SportService: fetched sports');
    return of(SPORTS);
  }

}
