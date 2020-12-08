import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { WorkDays } from 'src/app/models/enums.model';
import { Project } from 'src/app/models/Projects';
import { ProjectService } from 'src/app/services/project.service';
import { DragAndDropModule, DropEvent } from 'angular-draggable-droppable';
 
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
  date;
  month: number;
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
    this.day = new Date().getDate();
    this.month = new Date().getMonth() + 1;
    let j = 0;
    for (let i = 0; j < 14; i++, j++) {
      if (i == 5) {
        i = 0;
        j += 2;
      }
      this.dates.push({
        day: `${this.daysEnum[i]}`,
        date: `${this.day + j}/${this.month}`,
      });
    }
  }
drag(event)
{
  event.dataTransfer.setData("project",event.srcElement.innerHTML);
  event.effectAllowed ="copy";
  }
  finish(event){
    var node = document.createElement("button");
    node.appendChild(document.createTextNode(event.dataTransfer.getData('project')));
    event.srcElement.appendChild(node);
  }
}