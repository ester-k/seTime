import { formatDate } from '@angular/common';
import { Component, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
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
  userList: User[];
  projectName;
  selected;
  status;
  priority;
  role;
  taskType;
  faultType;
  subprojectName;
  clientName;
  userName;
  taskForm;
  haveProject: boolean = false;
  projectId;
  constructor(
    @Optional() public dialog: MatDialog,
    private projectService: ProjectService,
    private userService: UserService,
    public taskService: TaskService,
    @Optional() public dialogRef: MatDialogRef<ToolBarComponent>
  ) {}
  ngOnInit(): void {
    this.getFaultTypeList();
    this.getPriorityList();
    this.getTaskTypeList();
    this.getClientList();
    this.getUserList();
    this.getStatusList();
    this.selected = 'option2';
    this.taskForm = new FormGroup({
      client: new FormControl('',Validators.required),
      projectName: new FormControl('',Validators.required),
      subprojectName: new FormControl('',Validators.required),
      title: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      additionalContent: new FormControl(''),
      remark: new FormControl(''),
      taskType: new FormControl(''),
      links: new FormControl(''),
      files: new FormControl(''),
      faultType: new FormControl(''),
      status: new FormControl(''),
      priority: new FormControl(''),
      userId: new FormControl('',Validators.required),
      dueDate: new FormControl(''),
      sendMail: new FormControl(''),
      clientAccess: new FormControl(''),
    });
  }
  getUserList() {
    this.userService.getUserList().subscribe((users: User[]) => {
      this.userList = users;
    });  }
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
     this.projectService.getProjectIdByName(event).subscribe((id:string) => {
       this.projectId = id;
       console.log(id);
    
     });
    this.projectService
      .getSubprojectList(event)
      .subscribe((subprojects: Subproject[]) => {
        this.subprojectList = subprojects;
        console.log("2");
        
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  addTask() {
    const task = new Task();
    task.clientId = this.taskForm.controls.client.value;
    task.projectId = this.projectId;
    task.title = this.taskForm.controls.title.value;
    task.description = this.taskForm.controls.description.value;
    debugger;
    if(this.taskForm.controls.remark.value=="")
    task.remark = "אין הערות";
     else
    task.remark = this.taskForm.controls.remark.value;
    task.additionalContent = this.taskForm.controls.additionalContent.value;
    task.createdBy=localStorage.getItem('userId');
    task.dueDate = this.taskForm.controls.dueDate.value;
    task.statusId = this.taskForm.controls.status.value;
    task.userId =this.taskForm.controls.userId.value;
    task.createdDate=new Date();
    this.taskService.createTask(task).subscribe((task) => {});
  }
}
