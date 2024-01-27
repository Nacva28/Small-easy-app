import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor() {}

  userName = 'John Doe';
  changeUserNameHandler() {
    if(this.userName == 'John Doe') {
      this.userName = 'irakli';
    } else {
      this.userName = 'John Doe';
    }
  }
}
