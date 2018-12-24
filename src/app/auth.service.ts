import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

//change me please
export class AuthService {
  getAuthorizationToken() {
    return 'Basic YUBnbWFpbC5jb206dml2aWFuZQ==';
  }
  constructor() { }
}


