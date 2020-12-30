import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/Projects';
import { ProjectService } from 'src/app/services/project.service';
import { SignInService } from 'src/app/services/sign-in.service';
import { UserService } from 'src/app/services/user.service';
import { WeekService } from 'src/app/services/workWeek.service';
import { AddProjectComponent } from '../add-project/add-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  @Input('listType') listType: string; //Date()
  @Input('listName') listName: string; // ex.20/12/2020
// open=false;
  currentUser;
  clientName;
  addProject = false;
  projectDate;
  constructor(
    private signIn: SignInService,
    private userService: UserService,
    public dialog: MatDialog,
    private projectService: ProjectService,
    private router: Router,
    private weekService: WeekService
  ) {}
  projectList;
  ngOnInit(): void {
    this.currentUser = this.signIn.CurrentUser;
    if (this.listType == 'client') {
      console.log('client');
      this.projectService
        .getProjectsByClient(this.listName)
        .subscribe((projects) => {
          this.projectList = projects;
          console.log('projectList',this.projectList);
        });
    }
     else {
       //מגיע 4 פעמים היום
      console.log('date');
      this.weekService.getTodayProjects(this.listName).subscribe((projects) => {       
        this.projectList = projects;
        this.projectList = JSON.parse(JSON.stringify(this.projectList));
      });
    }
    console.log(this.projectList);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  // getProjects() {
  //   this.projectService.getProjects().subscribe((projects: Project[]) => {
  //     this.projectList = projects;
  //   });
  // }
  projectClick(value) {
    console.log(value);
    this.router.navigate(['/project', value]);
  }
  // getClientName(projectName) {
  //   this.userService.getUserNameById(projectName).subscribe((userName) => {
  //     console.log(userName);
  //     this.clientName = userName;
  //   });
  //   return this.clientName;
  // }

open(value) {
  console.log(value);
  this.router.navigate(['/taskList', value]);
}
// getClientName(projectName) {
//   this.userService.getUserNameById(projectName).subscribe((userName) => {
//     console.log(userName);
//     this.clientName = userName;
//   });
//   return this.clientName;
// }
}
