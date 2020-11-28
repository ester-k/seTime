import { formatDate } from '@angular/common';
import { Component, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { FaultType } from 'src/app/models/faultType';
import { Priority } from 'src/app/models/Priority';
import { Project } from 'src/app/models/Projects';
import { Status } from 'src/app/models/Status';
import { Subproject } from 'src/app/models/subproject';
import { Task } from 'src/app/models/Tasks';
import { TaskType } from 'src/app/models/taskType';
import { projectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { MenuComponent } from '../menu/menu.component';
import { ToolBarComponent } from '../tool-bar/tool-bar.component';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  projectList: Project[];
  statusList: Status[];
  priorityList: Priority[];
  taskTypeList: TaskType[];
  faultTypeList: FaultType[];
  subprojectList: Subproject[];
  clientList: Client[];
  projectName;
  selected;
  status;
  priority;
  taskType;
  faultType;
  subprojectName;
  clientName;
  taskForm;
  constructor(
    @Optional() public dialog: MatDialog,
    private projectService: projectService,
    public taskService: TaskService,
    @Optional() public dialogRef: MatDialogRef<ToolBarComponent>
  ) {}
  ngOnInit(): void {
    this.getProjects();
    this.getFaultTypeList();
    this.getPriorityList();
    this.getTaskTypeList();
    this.getClientList();
    this.getSubprojectList();
    this.getStatusList();
    this.selected = 'option2';
    this.taskForm = new FormGroup({
      client: new FormControl(''),
      projectName: new FormControl(''),
      subprojectName: new FormControl(''),
      title: new FormControl(''),
      description: new FormControl(''),
      additionalContent: new FormControl(''),
      remark: new FormControl(''),
      taskType: new FormControl(''),
      links: new FormControl(''),
      files: new FormControl(''),
      faultType: new FormControl(''),
      status: new FormControl(''),
      priority: new FormControl(''),
      userId: new FormControl(''),
      dueDate: new FormControl(''),
      sendMail: new FormControl(''),
      clientAccess: new FormControl(''),
    });
  }
  getClientList() {
    this.taskService.getClientList().subscribe((clients: Client[]) => {
      this.clientList = clients;
    });
  }
  getFaultTypeList() {
    this.taskService.getFaultTypeList().subscribe((faults: FaultType[]) => {
      this.faultTypeList = faults;
    });
  }

  getProjects() {
    this.projectService.getProjects().subscribe((projects: Project[]) => {
      this.projectList = projects;
    });
  }

  getTaskTypeList() {
    this.taskService.getTaskTypeList().subscribe((taskTypes: TaskType[]) => {
      this.taskTypeList = taskTypes;
    });
  }
  getPriorityList() {
    this.taskService.getPriorityList().subscribe((prioritys: Priority[]) => {
      this.priorityList = prioritys;
    });
  }
  getStatusList() {
    this.taskService.getStatusList().subscribe((statuses: Status[]) => {
      this.statusList = statuses;
    });
  }
  getSubprojectList() {
    this.taskService
      .getSubprojectList()
      .subscribe((subprojects: Subproject[]) => {
        this.subprojectList = subprojects;
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addTask() {
    const task = new Task();
    task.description = this.taskForm.controls.taskDescription.value;
    task.dueDate = this.taskForm.controls.taskStartDate.value;
    task.statusId = this.taskForm.controls.taskStatus.value;
    task.userId = localStorage.getItem('userId');
    this.taskService.createTask(task).subscribe((task) => {
      console.log(task);
    });
  }
}
