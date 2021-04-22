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
  addProject(week): Observable<any> {
    return this.http.post<any>(`${this.url}/add`, week);
  }
  deleteProject(project):Observable<any> {
    console.log("here");
    
    return this.http.post<any>(`${this.url}/deleteProject`, project);
  }
  getTodayProjects(today):Observable<WorkWeek[]> {  
          return this.http.post<WorkWeek[]>(`${this.url}/getTodayProjects`,JSON.parse(JSON.stringify(today)));
  }
  getUserProjects(user):Observable<WorkWeek[]>{   
    return this.http.get<WorkWeek[]>(`${this.url}/getUserProjects/${user}`);
  }
}
