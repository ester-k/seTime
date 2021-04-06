import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { WorkDays } from '../models/enums.model';

@Injectable({
  providedIn: 'root',
})
export class DateInWeekService {
  constructor() {}
  dates = new Array();
  daysEnum = WorkDays;
  numOfDays;
  date = {
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    dayNum: new Date().getDay() + 1,
  };
  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
  isWeek(input_date: Date, dayNum: number) {
    let date = moment(input_date);
    return (
      date.isBefore(moment().subtract(dayNum, 'days').add(6, 'day')) &&
      date.isAfter(moment().subtract(dayNum, 'days'))
    );
  }
  dateInThreeWeeks() {
    if (this.date.day - this.date.dayNum - 6 < 0) {
      this.numOfDays = this.daysInMonth(this.date.month - 1, this.date.year);
      if (this.date.month == 1) {this.date.month = 12;this.date.year =this.date.year-1}
      else this.date.month -= 1;
      this.date.day = this.date.day - this.date.dayNum - 6 + this.numOfDays;
    } else {
      this.numOfDays = this.daysInMonth(this.date.month, 2020);
      this.date.day = this.date.day - this.date.dayNum - 6;
    }
    let j = 0,
      k = 0;
    for (let i = 0; k < 15; i++, k++) {
      this.date.day += j;
      if (this.date.day > this.numOfDays) {this.date.day = 1;this.date.month += 1;j = 0;}
      if (i == 5) {i = 0;this.date.day += 2;}
      if (this.isWeek(new Date(this.date.year, this.date.month - 1, this.date.day),this.date.dayNum))
       {
        if (this.date.day == new Date().getDate()) {
          this.dates.push({
            day: `${this.daysEnum[i]}`,
            date: {day: this.date.day,month: this.date.month,year: this.date.year},
            description: 'היום',
          });
        } else
          this.dates.push({
            day: `${this.daysEnum[i]}`,
            date: {day: this.date.day,month: this.date.month,year: this.date.year},
            description: 'השבוע',
          });
      } else {
        this.dates.push({
          day: `${this.daysEnum[i]}`,
          date: {day: this.date.day,month: this.date.month,year: this.date.year},
          description: 'none',
        });
      }
      j = 1;
    }
    return this.dates;
  }

  dateInTwoWeeks() {
    this.numOfDays = this.daysInMonth(this.date.month, 2020);
    this.date.day = this.date.day - this.date.dayNum + 1;
    let j = 0,
      k = 0;
    for (let i = 0; k < 10; i++, k++) {
      this.date.day += j;
      if (this.date.day > this.numOfDays) {
        this.date.day = 1;
        this.date.month += 1;
        j = 0;
      }
      if (i == 5) {
        i = 0;
        this.date.day += 2;
      }

      if (
        this.isWeek(
          new Date(this.date.year, this.date.month - 1, this.date.day),
          this.date.dayNum
        )
      ) {
        if (this.date.day == new Date().getDate()) {
          this.dates.push({
            day: `${this.daysEnum[i]}`,
            date: {
              day: this.date.day,
              month: this.date.month,
              year: this.date.year,
            },
            description: 'היום',
          });
        } else
          this.dates.push({
            day: `${this.daysEnum[i]}`,
            date: {
              day: this.date.day,
              month: this.date.month,
              year: this.date.year,
            },
            description: 'השבוע ',
          });
      } else {
        this.dates.push({
          day: `${this.daysEnum[i]}`,
          date: {
            day: this.date.day,
            month: this.date.month,
            year: this.date.year,
          },
          color: 'white',
        });
      }
      j = 1;
    }
    return this.dates;
  }
}
