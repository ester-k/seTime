import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/Roles';
import { User } from '../models/user';
import {Image}  from '../models/image'
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:4000/user';
  getGalleryById(id: string): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.get<Image>(url)
    }

  addGallery(gallery: Image, file: File): Observable<any> {
    console.log("  UserService ~ addGallery ~ file", file)
//     lastModified: 1597664044900
// lastModifiedDate: Mon Aug 17 2020 14:34:04 GMT+0300 (שעון ישראל (קיץ)) {}
// name: "WIN_20200817_14_34_04_Pro.jpg"
// size: 126697
// type: "image/jpeg"
// webkitRelativePath: ""
    console.log(" UserService ~ addGallery ~ gallery", gallery)
//     imageDesc: "בטבריה"
// imageFile: FileInput
// delimiter: ", "
// _fileNames: "WIN_20200817_14_34_04_Pro.jpg"
// _files: Array(1)
// 0: File {name: "WIN_20200817_14_34_04_Pro.jpg", lastModified: 1597664044900, lastModifiedDate: Mon Aug 17 2020 14:34:04 GMT+0300 (שעון ישראל (קיץ)), webkitRelativePath: "", size: 126697, …}
// length: 1
// __proto__: Array(0)
// fileNames: (...)
// files: (...)
// __proto__: Object
// imageTitle: "רבקה"
    const formData = new FormData();
    formData.append('file', file);
    formData.append('imageTitle', gallery.imageTitle);
    formData.append('imageDesc', gallery.imageDesc);
    console.log(" UserService ~ addGallery ~ formData", formData.get("imageTitle"))
    const header = new HttpHeaders();
    const params = new HttpParams();

    const options = {
      params,
      reportProgress: true,
      headers: header
    };
    const req = new HttpRequest('POST', `${this.url}/uploadImage`, formData, options);
    return this.http.request(req);
  }
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
 
}
