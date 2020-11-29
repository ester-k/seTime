import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { Subproject } from '../models/subproject';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
 
  constructor(private http: HttpClient) { }

  url = 'http://localhost:4000/manager';
  option = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  addClient(client: Client) :Observable<Client>{
    return this.http.post<Client>(`${this.url}/addClient`, client);

  }
  addSubproject(subproject: Subproject):Observable<Subproject> {
    return this.http.post<Subproject>(`${this.url}/addSubproject`, subproject);
  }
}