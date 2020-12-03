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
  constructor(
    private taskService: TaskService,
  ) {}
  taskList = new Array<Task>();

  @Input('projectName') projectName: string;
  ngOnInit(): void {
    this.changeTaskView();
  }

  completeTask(value) {
    this.taskService.completeTask(value).subscribe(() => {
      console.log('in subscribe completeTask ');
      this.changeTaskView();
    });
    console.log("after in subscribe complete");
   
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
