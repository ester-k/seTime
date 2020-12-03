import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/app/models/Projects';
import { ProjectsComponent } from '../projects/projects.component';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { ProjectNameService } from 'src/app/validators/project-name.service';
import { Client } from 'src/app/models/client';
import { TaskService } from 'src/app/services/task.service';
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

  constructor(
    private taskService: TaskService,
    private router: Router,
    private projectService: ProjectService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProjectsComponent>
  ) {}

  ngOnInit(): void {
    this.getClientList();
    this.projectForm = new FormGroup({
      projectName: new FormControl('', Validators.required),
      startDate: new FormControl(''),
      client: new FormControl(''),
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addProject(value: string) {
    const project = new Project();
    project.projectName = this.projectForm.controls.projectName.value;
    //האם אפשר להכניס שם בגלל שאח"ב ברשיצת פרויקטים אני רוצה לשלוף עפ"י שם
    // this.clientList.forEach((c) => {
    //   if (c.clientName === this.projectForm.controls.client.value)
    //     project.clientId = c._id;
    // });
    project.clientId = this.projectForm.controls.client.value;
    this.projectService.addProject(project).subscribe((project) => {
      console.log(project);
    });
    this.router.navigate(['/project', value]);
  }
  getClientList() {
    this.taskService.getClientList().subscribe((clients: Client[]) => {
      this.clientList = clients;
    });
  }
  checkProjectName(name) {
    if(name!=undefined) {
    console.log('checkProjectName');
    let projectClient={projectName:name,clientId:this.projectForm.controls.client.value}
    this.projectService
      .checkProjectName(projectClient)
      .subscribe((res) => {
        if (res) {
          console.log('true');
          this.projectError = 'קיים פרויקט בעל שם זה.';
          this.projectForm.controls.projectName.setErrors({'nameExist': true});
        }
        else this.projectError=null;
      });
  }
}
}
