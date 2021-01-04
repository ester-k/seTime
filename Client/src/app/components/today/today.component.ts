import { Component, OnInit } from '@angular/core';
import { WorkWeek } from 'src/app/models/workWeek';
import { DateInWeekService } from 'src/app/services/date.service';
import { TaskService } from 'src/app/services/task.service';
import { WeekService } from 'src/app/services/workWeek.service';
import { WorkDays } from 'src/app/models/enums.model';
@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
})
export class TodayComponent implements OnInit {
  todayProjects: WorkWeek[];
  today = 'today';
  weekly = 'weekly';
  dates;
  panelOpenState = false;
  days = WorkDays;
  day = 0;
  date = 'date';
  open=false;
  user=localStorage.getItem('userName');
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
      if (date == 'today') 
      return new Date();
      else return new Date(date.year, date.month - 1, date.day);
    }
  }
  constructor(
    private taskService: TaskService,
    private weekService: WeekService,
    private dateInWeekService: DateInWeekService
  ) {}
  ngOnInit(): void {
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
}
