import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RefreshService {
  constructor() {}
  refresh(name) {
    if (localStorage.getItem('refresh') != name){
     location.reload();
    localStorage.setItem('refresh', name);}
  }
}
