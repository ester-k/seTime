import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/Roles';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:4000/user';

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  getUserList(): Observable<any> {
    return this.http.get<any>(this.url);
  }
  getRolesList(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.url}/getRolesList`);
  }
  getUserNameById(id: string): Observable<string> {
    console.log('here');
    return this.http.get<string>(`${this.url}/getUserNameById/${id}`);
  }
  uploadImage(uploadImage):Observable<any>{
    console.log(uploadImage);
    
    return this.http.post<any>(`${this.url}/uploadImage`,uploadImage);
    // ,
    // {reportProgress:true,
    // observe:'events'}
  }
}
