import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  constructor(private http: HttpClient) { }

  url = 'http://localhost:4000/manager';
  option = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  addClient(client: Client) {
    return this.http.post<Client>(`${this.url}/addClient`, client);

  }
}