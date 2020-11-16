import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { projectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  name: string;

  constructor(private route: ActivatedRoute,private projectService:projectService) { }
  ngOnInit(): void {

     this.name = this.route.snapshot.params.name;

  }
  addItem(newItem: string) {
    this.name = newItem;
    console.log("nsme: " + this.name);

  }

}
