import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/Projects';
import { ProjectService } from 'src/app/services/project.service';
import { SignInService } from 'src/app/services/sign-in.service';
import { UserService } from 'src/app/services/user.service';
import { AddProjectComponent } from '../add-project/add-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  currentUser;
  clientName;
  addProject = false;
  i = 0;
  constructor(
    private signIn: SignInService,
    private userService: UserService,
    public dialog: MatDialog,
    private projectService: ProjectService,
    private router: Router
  ) {}
  projectList: Project[];
  ngOnInit(): void {
    this.currentUser = this.signIn.CurrentUser;
    this.getProjects();
    console.log(this.projectList);
    this.i = 0;
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
    console.log(value);
    this.router.navigate(['/project', value]);
  }
   getClientName(projectName) {
    this.userService.getUserNameById(projectName).subscribe((userName) => {
      console.log(userName);
      this.clientName = userName;
    });
   return this.clientName;
  }
}
