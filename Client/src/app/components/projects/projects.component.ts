import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/Projects';
import { projectService } from 'src/app/services/project.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { SignInService } from 'src/app/services/sign-in.service';
import { AddProjectComponent } from '../add-project/add-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  currentUser;
  addProject = false;
  constructor(
    private signIn: SignInService,
    private refreshService: RefreshService,
    public dialog: MatDialog,
    private projectService: projectService,
    private router: Router
  ) {}
  projectList: Project[];
  ngOnInit(): void {
    this.currentUser = this.signIn.CurrentUser;
    this.getProjects();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  getProjects() {
    this.projectService.getProjects().subscribe((projects: Project[]) => {
      this.projectList = projects;
    });
  }
  projectClick(value) {
    localStorage.setItem('refresh', ' ');
    console.log(value);
    this.router.navigate(['/project', value]);
    
  }
}
