import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  constructor() { }
  refresh(){
   const timeout = setTimeout(function () {
      window.location.reload();
    }, 0.0);
    clearTimeout(timeout);
  }
  
}
