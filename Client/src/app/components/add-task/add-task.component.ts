import {  formatDate } from '@angular/common';
import { Component, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/app/models/Projects';
import { Task } from 'src/app/models/Tasks';
import { projectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { MenuComponent } from '../menu/menu.component';
import { ToolBarComponent } from '../tool-bar/tool-bar.component';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  selected;
  taskForm;
  projectList: Project[];
  projectName;
  constructor(@Optional() public dialog: MatDialog,
   // public datepipe: DatePipe, 
    private projectService: projectService, public taskService: TaskService, @Optional() public dialogRef: MatDialogRef<ToolBarComponent>) { }
  ngOnInit(): void {
    this.getProjects()
    this.selected = 'option2';
    this.taskForm = new FormGroup({
      taskName: new FormControl(""),
      taskDescription: new FormControl(""),
      taskPriority: new FormControl(""),
      taskStatus: new FormControl(""),
      taskStartDate: new FormControl(""),
      taskDuration: new FormControl(""),
      projectName: new FormControl("")
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addTask() {
    const task = new Task()
    task.description = this.taskForm.controls.taskDescription.value;
    task.dueDate= this.taskForm.controls.taskStartDate.value;
    task.statusId = this.taskForm.controls.taskStatus.value;
    task.userId=localStorage.getItem("userId");
    this.taskService.createTask(task)
      .subscribe((task) => {
        console.log(task);
      });
  }
  getProjects() {
    this.projectService.getProjects()
      .subscribe((projects: Project[]) => {
        this.projectList = projects;
      });
  }

}
