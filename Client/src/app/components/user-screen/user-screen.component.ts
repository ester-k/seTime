import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { WorkWeek } from 'src/app/models/workWeek';
import { DateInWeekService } from 'src/app/services/date.service';
import { TaskService } from 'src/app/services/task.service';
import { WeekService } from 'src/app/services/workWeek.service';
import { WorkDays } from 'src/app/models/enums.model';
import {
  MatCarouselSlideComponent,
  Orientation,
} from '@ngmodule/material-carousel';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-screen',
  templateUrl: './user-screen.component.html',
  styleUrls: ['./user-screen.component.css'],
})
export class UserScreenComponent implements OnInit {
  workDays = WorkDays;
  todayProjects: WorkWeek[];
  today = 'date';
  // weekly = 'weekly';
  dates;
  panelOpenState = false;
  days = WorkDays;
  day = 0;
  date = { day: this.workDays[new Date().getDay()], date: new Date() };
  open = false;
  user = JSON.parse(localStorage.getItem('currentUser')).username;
  listTypes = ['date', 'week', 'allOpen', 'all'];
  Open = 'open';
  all = 'all';
  week = 'week';
  time: string;
  alltaskNumber: number;
  weektaskNumber: number;
  daytaskNumber: number;
  opentaskNumber: number;

  setDay(index: number, date) {
    this.day = index;
    this.getProjectsByDate(date);
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
    private taskService: TaskService,
    private weekService: WeekService,
    private dateInWeekService: DateInWeekService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    let hour = new Date().getHours();
    switch (true) {
      case hour < 12:
        this.time = 'בוקר טוב';
        break;
      case hour < 16:
        this.time = 'צהרים טובים';
        break;
      case hour < 19:
        this.time = 'אחר צהרים טובים';
        break;
      case hour >= 19:
        this.time = 'ערב טוב';
        break;
      default:
        break;
    }
    this.weekService.getTodayProjects(new Date()).subscribe((projects) => {
      this.todayProjects = projects;
      console.log(this.todayProjects);
    });
    this.dates = this.dateInWeekService.dateInTwoWeeks();
  }
  getProjectsByDate(date) {
    this.panelOpenState = true;
    console.log(date);

    this.weekService
      .getTodayProjects(new Date(date.year, date.month - 1, date.day))
      .subscribe((projects) => {
        this.todayProjects = projects;
        // console.log(this.todayProjects);
      });
  }
  alltasksNumber(value: number) {
    this.alltaskNumber = value;
  }
  opentasksNumber(value: number) {
    this.opentaskNumber = value;
  }
  weektasksNumber(value: number) {
    this.weektaskNumber = value;
  }
  daytasksNumber(value: number) {
    this.daytaskNumber = value;
  }
}
