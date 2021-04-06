import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { Client } from '../models/client';
import { FaultType } from '../models/faultType';
import { Priority } from '../models/Priority';
import { Status } from '../models/Status';
import { Task } from '../models/Tasks';
import { TaskType } from '../models/taskType';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) { }

  url = 'http://localhost:4000/task';

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.url}`, task);
  }
    getAllTasks(filter): Observable<any> {
      return this.http.get<any>(`${this.url}/getAllTasks/${filter}`);
    }
  getTaskListByProjectName(projectName): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.url}/getTasksByProject/${projectName}`);
  }
  getTasksByDate(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.url}/getTasksByDate`);
  }
  
  getWeeklyTask(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.url}/getWeeklyTask`);
  }
  completeTask(id: string): Observable<Task> {
    return this.http.post<Task>(`${this.url}/completeTask`, { id });
  }
  deleteTask(id): Observable<Task> {
    return this.http.delete<Task>(`${this.url}/${id}`);
  }

  getClientList(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.url}/getClientList`);
  }
  getStatusList(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.url}/getStatusList`);
  }
  getPriorityList(): Observable<Priority[]> {
    return this.http.get<Priority[]>(`${this.url}/getPriorityList`);
  }
  getTaskTypeList(): Observable<TaskType[]> {
    return this.http.get<TaskType[]>(`${this.url}/getTaskTypeList`);
  }
  getFaultTypeList(): Observable<FaultType[]> {
    return this.http.get<FaultType[]>(`${this.url}/getFaultTypeList`);
  }
  sendMail(): Observable<string> {
    return this.http.get<string>(`${this.url}/sendEmail`);
  }
  showMessage(): Observable<string> {
    return this.http.get<string>(`${this.url}/showMessage`);
  }
}