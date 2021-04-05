import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectName: string;

  constructor(private route: ActivatedRoute,private projectService:ProjectService) { }
  ngOnInit(): void {

     this.projectName = this.route.snapshot.params.name;

  }
  addItem(newItem: string) {
    this.projectName = newItem;
    console.log("nsme: " + this.projectName);

  }

}
