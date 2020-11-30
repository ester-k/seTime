import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { TaskComponent } from '../components/task/task.component';
import { Client } from '../models/client';
import { FaultType } from '../models/faultType';
import { Priority } from '../models/Priority';
import { Role } from '../models/Roles';
import { Status } from '../models/Status';
import { Subproject } from '../models/subproject';
import { Task } from '../models/Tasks';
import { TaskType } from '../models/taskType';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
 
 
  
  constructor(private http: HttpClient) {}

  url = 'http://localhost:4000/task';

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, task);
  }
//   getTask(): Observable<any> {
//     return this.http.get<any>(`${this.url}`);
//   }
  getTaskListByProjectName(projectName): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.url}/getTasksByProject/${projectName}`);
  }
  getTasksByDate(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.url}/getTasksByDate`);
  }
  completeTask(id:string): Observable<Task> {
    return this.http.post<Task>(`${this.url}/completeTask`,{id});
  }
  deleteTask(id): Observable<Task> {
    return this.http.delete<Task>(`${this.url}/${id}`);
  }

  getClientList():Observable<Client[]> {
    return this.http.get<Client[]>(`${this.url}/getClientList`);
  }
  getStatusList():Observable<Status[]> {
    return this.http.get<Status[]>(`${this.url}/getStatusList`);
  }
  getPriorityList():Observable<Priority[]> {
    return this.http.get<Priority[]>(`${this.url}/getPriorityList`);
  }
  getTaskTypeList():Observable<TaskType[]> {
    return this.http.get<TaskType[]>(`${this.url}/getTaskTypeList`);
  }
  getFaultTypeList() :Observable<FaultType[]> {
    return this.http.get<FaultType[]>(`${this.url}/getFaultTypeList`);
  }
  
  
}
