import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { FaultType } from 'src/app/models/faultType';
import { Priority } from 'src/app/models/Priority';
import { Project } from 'src/app/models/Projects';
import { Status } from 'src/app/models/Status';
import { Subproject } from 'src/app/models/subproject';
import { Task } from 'src/app/models/Tasks';
import { TaskType } from 'src/app/models/taskType';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { ToolBarComponent } from '../tool-bar/tool-bar.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAccordion } from '@angular/material/expansion';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
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
  username;
  taskForm;
  haveProject: boolean = false;
  projectId;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  links: any[]=[];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
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
      client: new FormControl('', Validators.required),
      projectName: new FormControl('', Validators.required),
      subprojectName: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      additionalContent: new FormControl(''),
      remark: new FormControl(''),
      taskType: new FormControl(''),
      links: new FormControl(
        '',
        Validators.pattern(
          '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$'
        )
      ),
      linkName: new FormControl(''),
      files: new FormControl(''),
      faultType: new FormControl(''),
      status: new FormControl('חדש'),
      priority: new FormControl(''),
      userId: new FormControl('', Validators.required),
      dueDate: new FormControl(''),
      sendMail: new FormControl(''),
      clientAccess: new FormControl(''),
    });
  }
  getUserList() {
    this.userService.getUsersList().subscribe((users: User[]) => {
      this.userList = users;
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
      console.log(taskTypes);
      
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

    this.projectService
      .getSubprojectList(event)
      .subscribe((subprojects: Subproject[]) => {
        this.subprojectList = subprojects;
        console.log('2');
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
    task.subprojectId = this.taskForm.controls.subprojectName.value;
    if (this.taskForm.controls.remark.value == '') task.remark = 'אין הערות';
    else task.remark = this.taskForm.controls.remark.value;
    task.additionalContent = this.taskForm.controls.additionalContent.value;
    task.createdBy = JSON.parse(localStorage.getItem('currentUser')).id;
    task.priority = this.taskForm.controls.priority.value;
    task.dueDate = this.taskForm.controls.dueDate.value;
    task.status = this.taskForm.controls.status.value;
    task.userId = this.taskForm.controls.userId.value;
    task.createdDate = new Date();
    task.links = this.links;
    task.faultType=this.taskForm.controls.faultType.value;
    this.taskService.createTask(task).subscribe((task) => {});
  }
  add(event: MatChipInputEvent, name, linkName): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if (this.taskForm.controls.links.valid)
      if ((value || '').trim()) {
        this.links.push({name:name, value: value.trim()});
      }
    if (this.taskForm.controls.links.valid)
      if (input) {
        // Reset the input value
        input.value = '';
        linkName.value = '';
      }
  }
  remove(fruit): void {
    const index = this.links.indexOf(fruit);

    if (index >= 0) {
      this.links.splice(index, 1);
    }
  }
  checkValid(linkName) {
    if (linkName.valid == '')
      this.taskForm.controls.links.setErrors({ noLimkName: true });
    else this.taskForm.controls.links.setErrors({ noLimkName: false });
  }
  addLink(link, linkName) {
    if (this.taskForm.controls.links.valid)
      this.links.push({
      name: this.taskForm.controls.linkName.value,
    value:  this.taskForm.controls.links.value,}
     );
    link.value = '';
    linkName.value = '';
   
  }
  addLinkClose(link, linkName){
    if(linkName.value!="")
    this.addLink(link, linkName);
    this.accordion.closeAll();
  }
}
