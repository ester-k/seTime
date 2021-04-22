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
    public dialog: MatDialog,
    private router: Router,
    private weekService: WeekService,
    private taskService: TaskService
  ) {}
  projectList;
  tasksNum = 0;
   today={"date":new Date(),"user":JSON.parse(localStorage.getItem('currentUser')).id} 
  //  date.getFullYear(), date.getMonth(), date.getDate()
  ngOnInit(): void {
    this.currentUser = this.signIn.CurrentUser;
    switch (this.listType) {
      case 'date':
        let date=  new Date()
            this.weekService
          .getTodayProjects(this.today)
          .subscribe((projects) => {
            this.projectList = projects;
                      this.daytasksNumber.emit(this.calculateTasksNumber());
          });
        break;
      case 'week':
        this.today.date=new Date(this.listName)
        this.weekService
           .getTodayProjects(this.today)
           .subscribe((projects) => {
             this.projectList = projects;
             
           });
        // this.weekService
        //   .getTodayProjects(this.listName)
        //   .subscribe((projects) => {
        //     this.projectList = projects;
            // this.weektasksNumber.emit(this.calculateTasksNumber());
          // });

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
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  
    open(value) {
    console.log(value);
    this.router.navigate(['/taskList', value]);
  }
}
