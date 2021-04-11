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
    let e=event;
    var node = document.createElement('BUTTON');
    node.appendChild(
      document.createTextNode(event.dataTransfer.getData('project'))
    );
    // הקלאס מתווסף אך בפועל לא מקבל את העיצוב של הקלאס הזה
    node.classList.add('drag');
    event.srcElement.parentNode.lastChild.appendChild(node);
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
      .subscribe((userHaveTask: String) => {
        if (userHaveTask) alert(userHaveTask + this.employee);
        if (userHaveTask != 'פרויקט זה כבר משויך לעובד זה בתאריך זה') {
          var node = document.createElement('BUTTON');
          // מתווסף בלי זה
          node.appendChild(
            document.createTextNode(e.dataTransfer.getData('project'))
          );
          // הקלאס מתווסף אך בפועל לא מקבל את העיצוב של הקלאס הזה
          node.classList.add('drag');
          e.srcElement.parentNode.lastChild.appendChild(node);
        }
      });
  }
  getUsers() {
    this.userService.getUsersList().subscribe((users) => {
      this.users = users;
    });
  }
  selectEmployee() {
    // remove projects
    document.getElementById('table').childNodes.forEach((node) => {
      let date = node.lastChild;
      if (date != null) date.textContent = '';
    });

    // import user's projects
    this.weekService
      .getUserProjects(this.employee)
      .subscribe((projects: WorkWeek[]) => {
        projects.forEach((project, index) => {
          let d = new Date(project.date);
          let item = this.dates.find((date) => date.date.day == d.getDate());
          console.log(item.date.day, 'item');
          let date_to_add = document.getElementById('day' + item.date.day);
          var node = document.createElement('BUTTON');
          node.innerHTML = project.project.projectName;
          date_to_add.appendChild(node);
        });
      });
  }
}
