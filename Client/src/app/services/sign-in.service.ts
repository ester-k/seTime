import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  private currentUser = undefined;
  loginChange: Subject<boolean> = new Subject<boolean>();
  constructor() { }
  get IsLogin() {
    return this.currentUser != undefined;
  }
  get CurrentUser() {
    return this.currentUser
  }
  setCurrentUser(roleId) {
    this.currentUser = roleId;
    if (roleId != undefined)
      this.loginChange.next(true);
    else
      this.loginChange.next(false);
    console.log(this.currentUser);

  }
}
