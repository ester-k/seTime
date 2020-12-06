import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Tasks';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
})
export class TodayComponent implements OnInit {
  todayTasks: Task[];
  today = 'today';
  weekly="weekly";
  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.taskService.getTasksByDate().subscribe((tasks) => {
      this.todayTasks = tasks;
      console.log("tasks");
      console.log(tasks);
      
    });
    localStorage.setItem("taskList","today")
    // this.taskService.getTasksByDate().subscribe((tasks) => {
    //   this.todayTasks = tasks;
    //   console.log('tasks');
    //   console.log(tasks);
    // });

  }
}
