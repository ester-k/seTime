import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/Tasks';
import { WorkWeek } from '../models/workWeek';
@Injectable({
  providedIn: 'root',
})
export class WeekService {
  constructor(private http: HttpClient) {}

  url='http://localhost:4000/workWeek';
  addProject(week): Observable<boolean> {
    console.log('service',week);//week.date: Sun Dec 06 2020 00:00:00 GMT+0200 (שעון ישראל (חורף)) 
    return this.http.post<boolean>(`${this.url}/add`, week);
  }
  getTodayProjects(date):Observable<WorkWeek[]> {
      return this.http.get<WorkWeek[]>(`${this.url}/getTodayProjects/${date}`);
  }
}
