import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Tasks';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  constructor(private taskService: TaskService) {}
  taskList = new Array<Task>();
  @Input('projectName') projectName: string;
  ngOnInit(): void {
    console.log(this.projectName);
    if (this.projectName == 'today') {
      this.taskService.getTasksByDate().subscribe((tasks) => {
        this.taskList = tasks;
      });
    } else {
      this.taskService
        .getTaskListByProjectName(this.projectName)
        .subscribe((tasks) => {
          this.taskList = tasks;
        });
    }
  }
  completeTask(value) {
    this.taskService.completeTask(value).subscribe();
  }
}
