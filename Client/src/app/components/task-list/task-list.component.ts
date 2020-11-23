import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Tasks';
import { RefreshService } from 'src/app/services/refresh.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private refreshService: RefreshService
  ) {}
  taskList = new Array<Task>();
  
  @Input('projectName') projectName: string;
  ngOnInit(): void {
    this.changeTaskView();
    
  }

  completeTask(value) {
    this.taskService.completeTask(value).subscribe();
  }
  
  changeTaskView() {
    console.log('task list');
    if (this.projectName == 'today') {
      this.taskService.getTasksByDate().subscribe((tasks) => {
        this.taskList = tasks;
      });
    } else {
      console.log(this.projectName);
      this.taskService
        .getTaskListByProjectName(this.projectName)
        .subscribe((tasks) => {
          console.log('subscribe with: ' + this.projectName);
          this.taskList = tasks;
        });
    }
  }
}
