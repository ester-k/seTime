import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Projects';
import { ProjectService } from 'src/app/services/project.service';
import { WorkWeek } from 'src/app/models/workWeek';
import { WeekService } from 'src/app/services/workWeek.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { DateInWeekService } from 'src/app/services/date.service';
import { WorkDays } from 'src/app/models/enums.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
declare var $:any;
@Component({
  selector: 'app-work-week',
  templateUrl: './work-week.component.html',
  styleUrls: ['./work-week.component.css'],
})
export class WorkWeekComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    private projectService: ProjectService,
    private weekService: WeekService,
    private userService: UserService,
    private dateWeekService: DateInWeekService
  ) {}
  i = 0;
  dates = new Array();
  lastWeek=[];
  nextWeek=[];
  projects: Project[];
  date;
  users: User[];
  today = 'today';
  weekly = 'weekly';
  panelOpenState = false;
  days = WorkDays;
  day = 0;
  user = JSON.parse(localStorage.getItem('currentUser'));
  employee: User = new User();
  addedProjects: { projectName: any; projectId: any; string_date: any;date:Date }[] = [];
  ngOnInit(): void {
      this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
    this.getUsers();
    this.dates = this.dateWeekService.dateInThreeWeeks();
  this.dates.forEach((date,index)=>{
      if(index<5)
      this.lastWeek.push(date)
      if(index>=5&&index<10)
      this.nextWeek.push(date)
    });
  }

  drag(event, projectId) {
    event.dataTransfer.setData('project', event.srcElement.innerHTML);
    event.dataTransfer.setData('projectId', projectId);
    event.effectAllowed = 'copy';
  }
  finish(event, date) {
    let projectName = event.dataTransfer.getData('project');
    let projectWeek = new WorkWeek();
    projectWeek.project = event.dataTransfer.getData('projectId');
    projectWeek.user = this.employee;
    projectWeek.date = new Date(
      date.date.year,
      date.date.month - 1,
      date.date.day
    );
    projectWeek.date.setHours(2, 0, 0, 0);
    this.weekService.addProject(projectWeek).subscribe((userHaveTask) => {
      //  user dont have tasks fo this projects
      if (userHaveTask.error == true)
        alert(userHaveTask.massage + this.employee.username);
      // This project is already associated
      if (userHaveTask.error == false) alert(userHaveTask.massage);
      if (userHaveTask.error != false) {
        this.addedProjects.push({
          projectName: projectName,
          projectId: projectWeek.project,
          string_date: date.date.day + '/' + date.date.month + '-' + date.day,
          date:projectWeek.date,
        });
        var node = document.createElement('mat-chip');
        node.setAttribute('style', 'margin:3px;width:222px');
        node.appendChild(document.createTextNode(projectName));
        node.classList.add(
          'mat-chip',
          'mat-focus-indicator',
          'mat-primary',
          'mat-standard-chip',
          'ng-star-inserted',
          'project-chip'
        );
        node.innerHTML =
          projectName +
          ' <mat-icon _ngcontent-dfc-c151 role="img" matchipremove id="remove-project" style="margin-inline-end: auto;" class="mat-icon notranslate mat-chip-remove mat-chip-trailing-icon material-icons mat-icon-no-color ng-star-inserted" aria-hidden="true" ">cancel</mat-icon>';
        event.srcElement.parentNode.lastChild.appendChild(node);
        document
          .getElementById('remove-project')
          .addEventListener('click', (evevnt) => {
            this.remove_project(evevnt);
          });
      }
    });
  }
  getUsers() {
    this.userService.getUsersList().subscribe((users) => {
      this.users = users;
    });
  }
  selectEmployee(selected, id) {
    this.employee.username = selected.srcElement.innerHTML;
    this.employee._id = id;

    // remove last employee projects
    document.getElementById('table').childNodes.forEach((node) => {
      let date = node.lastChild;
      if (date != null) date.textContent = '';
    });

    // import user's projects
    this.weekService
      .getUserProjects(this.employee._id)
      .subscribe((projects: WorkWeek[]) => {
        projects.forEach((project) => {
          let d = new Date(project.date);
          let item = this.dates.find((date) => date.date.day == d.getDate());
          if (item != undefined) {
            let date_to_add = document.getElementById('day' + item.date.day);
            var node = document.createElement('mat-chip');
            node.setAttribute('style', 'margin:3px;width:222px');
            node.classList.add(
              'mat-chip',
              'mat-focus-indicator',
              'mat-primary',
              'mat-standard-chip',
              'ng-star-inserted',
              'project-chip'
            );
            node.innerHTML = project.project.projectName;
            date_to_add.appendChild(node);
          }
        });
      });
  }
  remove_project(ev) {
    let project_name = ev.srcElement.parentNode.firstChild.textContent;
    // project_name=project_name.toString();
    let date =
      ev.srcElement.parentNode.parentNode.parentNode.firstChild.innerHTML;
    //remove spaces to compare the dates
      let auxiliary_array_split = [];
    auxiliary_array_split = date.split(' ');
    auxiliary_array_split.reverse();
    date = '';
    auxiliary_array_split.forEach((d) => {
      if (d != '') date += d;
    });
    //find the project in the added_projects array
    let project = this.addedProjects.find(
      (project) => project.projectName.trim() == project_name.trim() && project.string_date == date
    );
    console.log(project);
    //delete this project from the work_week collections
    this.weekService.deleteProject(project).subscribe((res)=>
    ev.srcElement.parentNode.remove()
    );
    
    

  }
  close() {
    document.getElementById("alert").remove();
  }
}
