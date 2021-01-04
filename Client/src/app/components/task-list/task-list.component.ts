import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/Tasks';
import { TaskService } from 'src/app/services/task.service';
import { WeekService } from 'src/app/services/workWeek.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  constructor(private taskService: TaskService, private weekService: WeekService,private route: ActivatedRoute) {}
  taskList = new Array<Task>();

  @Input('projectName') projectName: string;
  @Input('projectList') projectList;
  ngOnInit(): void {
    // this.projectList = this.route.snapshot.params.list;
    this.getTaskList();
  }

  completeTask(value) {
    this.taskService.completeTask(value).subscribe(() => {
      this.getTaskList();
    });
  }

  getTaskList() {
    if (this.projectName == 'today'){
    this.taskService.getTaskListByProjectName(this.projectName).subscribe((taskList) => {
      this.taskList = taskList;
    })
  }
  if (this.projectName == 'weekly'){
    this.taskService.getTaskListByProjectName(this.projectName).subscribe((taskList) => {
      this.taskList = taskList;
    })

  }
    // console.log('task list with: '+ this.projectName);
    // if (this.projectName == 'today') {
    //   console.log("today");
      
    //   this.weekService.getTodayTasks().subscribe((tasks) => {
    //     this.taskList = tasks;
    //   })
    // } else if (this.projectName == 'weekly') {
    //   console.log("weekly");
      
    //   // this.taskService.getWeeklyTask().subscribe((tasks) => {
    //   //   this.taskList = tasks;
    //   //   console.log(tasks);
    //   // });
    // } else {
    //   console.log(this.projectName);
    //   this.taskService
    //     .getTaskListByProjectName(this.projectName)
    //     .subscribe((tasks) => {
    //       console.log('subscribe with: ' + this.projectName);
    //       this.taskList = tasks;
    //     });
    // }
  }
}
