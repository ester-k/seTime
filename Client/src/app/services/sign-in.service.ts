import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  private currentUser = undefined;
  loginChange: Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  url = 'http://localhost:4000/auth';
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
  addSignRequest(req):Observable<Request>{
    return this.http.post<Request>(this.url+'/'+"addSignRequest",req)
  }
}
