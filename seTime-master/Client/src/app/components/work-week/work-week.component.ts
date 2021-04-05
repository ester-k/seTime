import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Projects';
import { ProjectService } from 'src/app/services/project.service';
import { WorkWeek } from 'src/app/models/workWeek';
import { WeekService } from 'src/app/services/workWeek.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { DateInWeekService } from 'src/app/services/date.service';
import { WorkDays } from 'src/app/models/enums.model';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { MatCarouselSlide, MatCarouselSlideComponent } from '@ngmodule/material-carousel';
import { NguCarouselConfig } from '@ngu/carousel';
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
  today = 'today';
  weekly = 'weekly';
  panelOpenState = false;
  days = WorkDays;
  day = 0;
  open = false;
  user = JSON.parse(localStorage.getItem("currentUser"));

  images = [1, 2].map((n) => `assets/img/${n}.png`);

  setDay(index: number, date) {
    this.day = index;
    this.getProjectsByDate(date);
  }
  getProjectsByDate(date: any) {
    throw new Error('Method not implemented.');
  }
  nextDay() {
    this.day++;
  }

  prevDay() {
    this.day--;
  }
  newDate(date) {
    {
      if (date == 'today') return new Date();
      else return new Date(date.year, date.month - 1, date.day);
    }
  }
  constructor(
    private projectService: ProjectService,
    private weekService: WeekService,
    private userService: UserService,
    private dateWeekService: DateInWeekService
  ) {}

  ngOnInit(): void {
   
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
      console.log('project', this.projects);
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
    console.log('first date: ', date);

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
      date.date.year,
      date.date.month - 1,
      date.date.day
    );
    projectWeek.date.setHours(2, 0, 0, 0);
    console.log('date', projectWeek.date);
    this.weekService
      .addProject(projectWeek)
      .subscribe((userHaveTask: boolean) => {
        if (!userHaveTask)
          alert(' לפרויקט זה אין משימות עבור ' + user.username);
      });
  }
  getUsers() {
    this.userService.getUsersList().subscribe((users) => {
      this.users = users;
    });
 
 
 
  }



  

 


}
