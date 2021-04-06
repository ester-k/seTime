import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Projects';
import { ProjectService } from 'src/app/services/project.service';
import { WorkWeek } from 'src/app/models/workWeek';
import { WeekService } from 'src/app/services/workWeek.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { DateInWeekService } from 'src/app/services/date.service';
import { WorkDays } from 'src/app/models/enums.model';

@Component({
  selector: 'app-work-week',
  templateUrl: './work-week.component.html',
  styleUrls: ['./work-week.component.css'],
})
export class WorkWeekComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
    private weekService: WeekService,
    private userService: UserService,
    private dateWeekService: DateInWeekService
  ) {}
  i = 0;
  dates = new Array();
  projects: Project[];
  date;
  users: User[];
  today = 'today';
  weekly = 'weekly';
  panelOpenState = false;
  days = WorkDays;
  day = 0;
  user = JSON.parse(localStorage.getItem('currentUser'));
  employee;
  userSlide;
  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
    this.getUsers();
    this.dates = this.dateWeekService.dateInThreeWeeks();
  }
  getSlide() {
    // this.userSlide=this.users[this.i];
    return this.users[this.i].username;
  }
  getPrevSlide() {
    if (this.i != 0) return this.users[this.i - 1].username;
  }
  getNextSlide() {
    return this.users[this.i + 1].username;
  }
  getPrev() {
    this.i = this.i === 0 ? 0 : this.i - 1;
  }
  getNext() {
    this.i = this.i === this.users.length ? this.i : this.i + 1;
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
    // event.srcElement.appendChild(node);
    document.getElementById('td-projects').appendChild(node);
    let projectWeek = new WorkWeek();
    projectWeek.project = event.dataTransfer.getData('projectId');
    projectWeek.user = this.employee;
    projectWeek.date = new Date(
      date.date.year,
      date.date.month - 1,
      date.date.day
    );
    projectWeek.date.setHours(2, 0, 0, 0);
    this.weekService
      .addProject(projectWeek)
      .subscribe((userHaveTask: boolean) => {
        if (!userHaveTask)
          alert(' לפרויקט זה אין משימות עבור ' + this.employee);
      });
  }
  getUsers() {
    this.userService.getUsersList().subscribe((users) => {
      this.users = users;
    });
  }
  selectEmployee() {
    const myNode = document.getElementById('td-projects');
    console.log('hi',myNode);
    myNode.childNodes.forEach((node) => {
      debugger;
      for (let i = 1; i < node.childNodes[0].childNodes.length; i++) {
        let m = node.childNodes[0].childNodes;
        console.log(i);
        node.removeChild(m[i]);
      }
    });
  }
}
