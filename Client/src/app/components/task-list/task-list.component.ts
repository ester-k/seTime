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
    
    this.getTaskList();
  }

  completeTask(value) {
    this.taskService.completeTask(value).subscribe(() => {
      console.log('in subscribe completeTask ');
      this.getTaskList();
    });
    console.log('after in subscribe complete');
  }

  getTaskList() {
    console.log('task list with: '+ this.projectName);
    if (this.projectName == 'today') {
      console.log("today");
      
      this.taskService.getTasksByDate().subscribe((tasks) => {
        this.taskList = tasks;
      });
    } else if (this.projectName == 'weekly') {
      console.log("weekly");
      
      this.taskService.getWeeklyTask().subscribe((tasks) => {
        this.taskList = tasks;
        console.log(tasks);
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
