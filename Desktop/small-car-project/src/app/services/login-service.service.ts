import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  private correctEmail = 'test@gmail.com';
  private correctPassword = '123456';
  private token = 'asddasdqw12e12r12e12e12e'
  constructor() {}

loginHandler (email: string, password: string) {
    if (email === this.correctEmail && this.correctPassword) {
      return this.token;
    } else {
      return false;
    }
  }
}
