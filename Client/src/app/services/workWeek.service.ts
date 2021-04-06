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
    return this.http.post<boolean>(`${this.url}/add`, week);
  }
  getTodayProjects(date):Observable<WorkWeek[]> {  
      return this.http.get<WorkWeek[]>(`${this.url}/getTodayProjects/${date}`);
  }
}
