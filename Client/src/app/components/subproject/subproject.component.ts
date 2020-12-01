import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/app/models/Projects';
import { Subproject } from 'src/app/models/subproject';
import { ManagerService } from 'src/app/services/manager.service';
import { ProjectService } from 'src/app/services/project.service';
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
    public dialogRef: MatDialogRef<ManagerComponent>
  ) {}
  projects: Project[];
  projectSelected;
  subprojectForm: FormGroup;
  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
    this.subprojectForm = new FormGroup({
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
    //האם אשפר להכניס רק שם משום שהשם הוא יחודי לכל לקוח
    // this.projectService
    //   .getProjectIdByName(projectName)
    //   .subscribe((projectId) => {
    //     subproject.projectId = projectId;
    //   });
    subproject.projectId=this.subprojectForm.controls.project.value;
    this.managerService.addSubproject(subproject).subscribe();
  }
}
