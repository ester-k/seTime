import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { WorkDays } from 'src/app/models/enums.model';
import { Project } from 'src/app/models/Projects';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-work-week',
  templateUrl: './work-week.component.html',
  styleUrls: ['./work-week.component.css'],
})
export class WorkWeekComponent implements OnInit {
  dates = new Array();
  sanday;
  projects: Project[];
  daysEnum = WorkDays;
  day;
  month: number;
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
    this.day = new Date().getDate();
    this.month = new Date().getMonth() + 1;
    for (let i = 0,j = 0; i <= 5; i++) {
      this.dates.push({"day":`${this.daysEnum[i]}`,"date":`${this.day + j}/${this.month}`});
        if (i == 5){i = 0;j+=2} ;
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
