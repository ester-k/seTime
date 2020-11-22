import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskComponent } from '../components/task/task.component';
import { Task } from '../models/Tasks';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor(private http: HttpClient,private taskService: TaskService) { }

    url = 'http://localhost:4000/task';

    createTask(task: Task): Observable<Task> {
               return this.http.post<Task>(this.url, task);
    }
    getTask(): Observable<any> {
        return this.http.get<any>(this.url);
    }
    getTaskListByProjectName(projectName): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.url}/${projectName}`);
        
    }
    getTasksByDate(): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.url}/getTasksByDate`);
    }
    completeTask(id):Observable<Task>
    {
        return this.http.delete<Task>(`${this.url}/${id}`) 
    }
   
}
