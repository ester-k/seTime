import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/app/models/Projects';
import { ProjectsComponent } from '../projects/projects.component';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { TaskService } from 'src/app/services/task.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
  projectForm;
  clientList: Client[];
  clientId;
  projectError = '';
projectManagers:User[];
  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProjectsComponent>
  ) {}

  ngOnInit(): void {
    this.getClientList();
    this.projectForm = new FormGroup({
      projectName: new FormControl('', Validators.required),
      projectManager: new FormControl('', Validators.required),
      startDate: new FormControl(''),
      client: new FormControl('', Validators.required),

    });
    this.projectService.getprojectMangers().subscribe((projectManagers)=>{
      this.projectManagers = projectManagers;
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addProject() {
    const project = new Project();
    project.projectName = this.projectForm.controls.projectName.value;
    project.clientId = this.projectForm.controls.client.value;
    project.projectManager=this.projectForm.controls.projectManager.value;
    this.projectService.addProject(project).subscribe((p) => {
      this._snackBar.open(
        ' הפרויקט ' + project.projectName + ' נוצר בהצלחה',
        ' הצגת הפרויקט',
        {
          duration: 5000,
        }
      );
    });

  }
  getClientList() {
    this.taskService.getClientList().subscribe((clients: Client[]) => {
      this.clientList = clients;
    });
  }
  checkProjectName(name) {
    if (name != undefined) {
      let projectClient = {
        projectName: name,
        clientId: this.projectForm.controls.client.value,
      };
      this.projectService.checkProjectName(projectClient).subscribe((res) => {
        if (res) {
          this.projectError = 'קיים פרויקט בעל שם זה.';
          this.projectForm.controls.projectName.setErrors({ nameExist: true });
        } else this.projectError = null;
      });
    }
  }
}
