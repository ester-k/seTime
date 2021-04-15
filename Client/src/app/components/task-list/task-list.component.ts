import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from 'src/app/models/Status';
import { Task } from 'src/app/models/Tasks';
import { PermissionService } from 'src/app/services/permission.service';
import { TaskService } from 'src/app/services/task.service';
import { WeekService } from 'src/app/services/workWeek.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private weekService: WeekService,
    private route: ActivatedRoute,
    private permissionService: PermissionService
  ) {}
  taskList = new Array<Task>();
  addComment = false;
  usersRoles: any;
  statusList: Status[];
  status;
  panelOpenState = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  // links = [
    
  // ];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input('projectName') projectName: string;
  @Input('projectList') projectList;
  ngOnInit(): void {
    this.usersRoles = this.permissionService.getRoleLogedIn();
    this.getStatusList();
    this.status = new FormControl('חדש');
  }

  getStatusList() {
    this.taskService.getStatusList().subscribe((statuses: Status[]) => {
      this.statusList = statuses;
    });
  }
  completeTask(value) {
    this.taskService.completeTask(value).subscribe(() => {
      this.getTaskList();
    });
  }

  getTaskList() {
    this.taskService
      .getTaskListByProjectName(this.projectName)
      .subscribe((taskList) => {
        this.taskList = taskList;
        console.log(this.taskList);
      });
  }
  // add(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;

  //   // Add our fruit
  //   if ((value || '').trim()) {
  //     this.links.push({name: value.trim()});
  //   }
  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }
  // }
  // remove(fruit): void {
  //   const index = this.links.indexOf(fruit);

  //   if (index >= 0) {
  //     this.links.splice(index, 1);
  //   }
  // }
}
