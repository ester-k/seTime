import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/Projects';
import { Subproject } from '../models/subproject';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:4000/project';
  option = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.url}/addProject`, project);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.url}/getProjects`);
  }
  // checkProjectName(projectName): Observable<boolean> {
  //     return  this.http.get<boolean>(`${this.url}/checkProjectName/${projectName}`);
  // }
  checkProjectName(project:object): Observable<boolean> {
    return this.http.post<boolean>(`${this.url}/checkProjectName`, project);
  }
  getProjectIdByName(projectName: string): Observable<string> {
    console.log(projectName);
    return this.http.get<string>(
      `${this.url}/getProjectIdByName/${projectName}`
    );
  }
  getSubprojectList(projectName): Observable<Subproject[]> {
    let projectId = this.getProjectIdByName(projectName);
    return this.http.get<Subproject[]>(
      `${this.url}/getSubprojectList/${projectId}`
    );
  }
}
