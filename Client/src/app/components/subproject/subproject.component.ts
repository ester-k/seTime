import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { Project } from 'src/app/models/Projects';
import { Subproject } from 'src/app/models/subproject';
import { ManagerService } from 'src/app/services/manager.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { ManagerComponent } from '../manager/manager.component';

@Component({
  selector: 'app-subproject',
  templateUrl: './subproject.component.html',
  styleUrls: ['./subproject.component.css'],
})
export class SubprojectComponent implements OnInit {
  constructor(
    private managerService: ManagerService,
    private projectService: ProjectService,
    private taskService: TaskService,
    public dialogRef: MatDialogRef<ManagerComponent>
  ) {}
  projects: Project[];
  projectSelected;
  subprojectForm: FormGroup;
  clientList: Client[];
  clientName;
  ngOnInit(): void {
    this.getClientList();

    this.subprojectForm = new FormGroup({
      client: new FormControl(''),
      subprojectName: new FormControl('', Validators.required),
      project: new FormControl('', Validators.required),
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addsubproject() {
    console.log('subproject');
    const subproject = new Subproject();
    subproject.subprojectName = this.subprojectForm.controls.subprojectName.value;
    const projectName = this.subprojectForm.controls.project.value;
    console.log(projectName);
    subproject.projectId = this.subprojectForm.controls.project.value;
    subproject.clientId = this.subprojectForm.controls.client.value;
    this.managerService.addSubproject(subproject).subscribe();
  }
  getProjects(event) {
    this.projectService
      .getProjectsByClient(event)
      .subscribe((projects: Project[]) => {
        this.projects = projects;
      });
  }
  getClientList() {
    this.taskService.getClientList().subscribe((clients: Client[]) => {
      this.clientList = clients;
    });
  }
}
