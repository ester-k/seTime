import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/Roles';
import { User } from '../models/user';
import { Image } from '../models/image';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  urlServer: string = 'http://';
  urlActivities: string = 'localhost:4000/';
  url = 'http://localhost:4000/user';
   
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }
  
  getUsersList(): Observable<any[]> {
    return this.http.get<any>(this.url);
  }
  deleteUser(user): Observable<any[]> {
    return this.http.delete<any>(`${this.url}/deleteUser/${user}`);
  }
  getRolesList(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.url}/getRolesList`);
  }
  updateUser(user: User, file: File): Observable<any> {
    const userId = JSON.parse(localStorage.getItem('currentUser'));
    const formData = new FormData();
    formData.append('file', file);
    formData.append('profileName', user.profileName);
    formData.append('password', user.password);
    formData.append('user', userId.id);
    const header = new HttpHeaders();
    const params = new HttpParams();
    const options = {
      params,
      reportProgress: true,
      headers: header,
    };
    const req = new HttpRequest(
      'POST',
      this.url + '/updateUser',
      formData,
      options
    );
    return this.http.request(req);
  }


  getGalleryById(id: string): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.get<Image>(url);
  }

  addGallery(gallery: Image, file: File): Observable<any> {
    console.log('  UserService ~ addGallery ~ file', file);
    console.log(' UserService ~ addGallery ~ gallery', gallery);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user', localStorage.getItem('user_Id'));

    console.log(' UserService ~ addGallery ~ formData', formData.get('file'));
    const header = new HttpHeaders();
    const params = new HttpParams();

    const options = {
      params,
      reportProgress: true,
      headers: header,
    };
    const req = new HttpRequest(
      'POST',
      `${this.url}/uploadImage`,
      formData,
      options
    );
    return this.http.request(req);
  }






}




