import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/app/models/Projects';
import { ProjectsComponent } from '../projects/projects.component';
import { projectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { ProjectNameService } from 'src/app/validators/project-name.service';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  projectForm;

  constructor(private checkProjectName:ProjectNameService,
     private router: Router, 
     private projectService: projectService,
      public dialog: MatDialog, 
      public dialogRef: MatDialogRef<ProjectsComponent>) { }

  ngOnInit(): void {
    
    this.projectForm = new FormGroup(
      {
        projectName: new FormControl('',Validators.compose([Validators.required,this.checkProjectName.checkProjectName()]) ),
        startDate: new FormControl('')
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addProject(value: string) {
    const project = new Project()
    project.name = this.projectForm.controls.projectName.value;
    this.projectService.addProject(project)
      .subscribe((project) => {
        console.log(project);
      });
    this.router.navigate(['/project', value]);

  }

}
