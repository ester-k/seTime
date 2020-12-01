import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Tasks';
import { RefreshService } from 'src/app/services/refresh.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
})
export class TodayComponent implements OnInit {
  todayTasks: Task[];
  projectName = 'today';
  constructor(
    private taskService: TaskService,
    private refreshService: RefreshService
  ) {}

  ngOnInit(): void {
    this.refreshService.refresh(this.projectName);
    this.taskService.getTasksByDate().subscribe((tasks) => {
      this.todayTasks = tasks;
    });
     //localStorage.setItem('refresh','false');
  }
}
