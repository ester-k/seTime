import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/Projects';
import { Task } from '../models/Tasks';
import { WorkWeek } from '../models/workWeek';
@Injectable({
  providedIn: 'root',
})
export class WeekService {
  constructor(private http: HttpClient) {}

  url='http://localhost:4000/workWeek';
  addProject(week): Observable<String> {
    console.log(week);
    
    return this.http.post<String>(`${this.url}/add`, week);
  }
  getTodayProjects(date):Observable<WorkWeek[]> {  
      return this.http.get<WorkWeek[]>(`${this.url}/getTodayProjects/${date}`);
  }
  getUserProjects(user):Observable<WorkWeek[]>{
    return this.http.get<WorkWeek[]>(`${this.url}/getUserProjects/${user}`);
  }
}
