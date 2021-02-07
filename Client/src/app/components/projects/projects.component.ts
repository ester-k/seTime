import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/Projects';
import { ProjectService } from 'src/app/services/project.service';
import { SignInService } from 'src/app/services/sign-in.service';
import { TaskService } from 'src/app/services/task.service';
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
  @Output() alltasksNumber: EventEmitter<number> = new EventEmitter<number>();
  @Output() opentasksNumber: EventEmitter<number> = new EventEmitter<number>();
  @Output() daytasksNumber: EventEmitter<number> = new EventEmitter<number>();
  @Output() weektasksNumber: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private signIn: SignInService,
    private userService: UserService,
    public dialog: MatDialog,
    private projectService: ProjectService,
    private router: Router,
    private weekService: WeekService,
    private taskService: TaskService
  ) {}
  projectList;
  tasksNum = 0;
  ngOnInit(): void {
    this.currentUser = this.signIn.CurrentUser;
    switch (this.listType) {
      case 'date':
        this.weekService
          .getTodayProjects(this.listName)
          .subscribe((projects) => {
            this.projectList = projects;
            console.log("today",projects);
            
            // this.projectList = JSON.parse(JSON.stringify(this.projectList));
            this.daytasksNumber.emit(this.calculateTasksNumber());
          });
        break;
      case 'week':
        this.weekService
          .getTodayProjects(this.listName)
          .subscribe((projects) => {
            this.projectList = projects;
           
            this.weektasksNumber.emit(this.calculateTasksNumber());
          });

        break;
      case 'all':
        this.taskService.getAllTasks('all').subscribe((projects) => {
          this.projectList = projects;
          // this.projectList = JSON.parse(JSON.stringify(this.projectList));
          this.alltasksNumber.emit(this.calculateTasksNumber());
        });
        break;
      case 'open':
        this.taskService.getAllTasks('open').subscribe((projects) => {
          this.projectList = projects;
          // this.projectList = JSON.parse(JSON.stringify(this.projectList));
        this.opentasksNumber.emit(this.calculateTasksNumber());
        });
        break;
      default:
        break;
    }
  }
  calculateTasksNumber() {
    for(let project of this.projectList) {
    for (let sub of project.subprojects) {
      this.tasksNum += sub.tasks.length;
    }
  }
   return this.tasksNum;
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
}
