import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Projects';
import { ProjectService } from 'src/app/services/project.service';
import { DragAndDropModule, DropEvent } from 'angular-draggable-droppable';
import * as moment from 'moment';
import { WorkWeek } from 'src/app/models/workWeek';
import { WeekService } from 'src/app/services/workWeek.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { DateInWeekService } from 'src/app/services/date.service';

@Component({
  selector: 'app-work-week',
  templateUrl: './work-week.component.html',
  styleUrls: ['./work-week.component.css'],
})
export class WorkWeekComponent implements OnInit {
  dates = new Array();
  projects: Project[];
  date;
  users: User[];
  constructor(
    private projectService: ProjectService,
    private weekService: WeekService,
    private userService: UserService,
    private dateWeekService: DateInWeekService
  ) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
      this.projects.forEach((project) => {
        console.log(
          'project:',
          JSON.parse(JSON.stringify(project.clientId)).clientName
        );
      });
    });
    this.getUsers();
    this.dates = this.dateWeekService.dateInThreeWeeks();
  }
  drag(event, projectId) {
    event.dataTransfer.setData('project', event.srcElement.innerHTML);
    event.dataTransfer.setData('projectId', projectId);

    event.effectAllowed = 'copy';
  }
  finish(event, date, user) {
    var node = document.createElement('BUTTON');
    node.appendChild(
      document.createTextNode(event.dataTransfer.getData('project'))
    );
    // הקלאס מתווסף אך בפועל לא מקבל את העיצוב של הקלאס הזה
    node.classList.add('projects');
    event.srcElement.appendChild(node);
    let projectWeek = new WorkWeek();
    projectWeek.project = event.dataTransfer.getData('projectId');
    // !!!אני רוצה להכניס כאוביקט
    projectWeek.user = user._id;
    projectWeek.date = new Date(
      new Date().getFullYear(),
      date.date.month - 1,
      date.date.day
    );
    projectWeek.date.setHours(2, 0, 0, 0);
    console.log(projectWeek.date);
    this.weekService
      .addProject(projectWeek)
      .subscribe((userHaveTask: boolean) => {      
        if(!userHaveTask) alert(' לפרויקט זה אין משימות עבור '+user.userName);
      });
  }
  getUsers() {
    this.userService.getUserList().subscribe((users) => {
      this.users = users;
    });
  }
}
