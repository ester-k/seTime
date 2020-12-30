import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:4000/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.userName,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    console.log(user.userName, user.password);
    return this.http.post(AUTH_API + 'signup', { 
      username: user.userName,
      role: user.role,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
}