import { formatDate } from '@angular/common';
import { Component, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { FaultType } from 'src/app/models/faultType';
import { Priority } from 'src/app/models/Priority';
import { Project } from 'src/app/models/Projects';
import { Role } from 'src/app/models/Roles';
import { Status } from 'src/app/models/Status';
import { Subproject } from 'src/app/models/subproject';
import { Task } from 'src/app/models/Tasks';
import { TaskType } from 'src/app/models/taskType';
import { ProjectService } from 'src/app/services/project.service';
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
  role;
  taskType;
  faultType;
  subprojectName;
  clientName;
  taskForm;
  haveProject: boolean = false;
  constructor(
    @Optional() public dialog: MatDialog,
    private projectService: ProjectService,
    public taskService: TaskService,
    @Optional() public dialogRef: MatDialogRef<ToolBarComponent>
  ) {}
  ngOnInit(): void {
    // this.getProjects();
    this.getFaultTypeList();
    this.getPriorityList();
    this.getTaskTypeList();
    this.getClientList();
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
  getProjects(event) {
    this.projectService
      .getProjectsByClient(event)
      .subscribe((projects: Project[]) => {
        this.projectList = projects;
      });
  }
  getSubprojectList(event) {
    console.log(event);
    let projectId: string;
    // this.haveProject = true;
    this.projectService.getProjectIdByName(event).subscribe((Id) => {
      projectId = Id;
    });
    this.projectService
      .getSubprojectList(event)
      .subscribe((subprojects: Subproject[]) => {
        this.subprojectList = subprojects;
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  addTask() {
    console.log('add task');

    const task = new Task();
    task.description = this.taskForm.controls.description.value;
    task.dueDate = this.taskForm.controls.dueDate.value;
    task.statusId = this.taskForm.controls.status.value;
    task.userId = localStorage.getItem('userId');
    this.taskService.createTask(task).subscribe((task) => {
      console.log(task);
    });
  }
}
