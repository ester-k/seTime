import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Tasks';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css']
})
export class WeeklyComponent implements OnInit {
  weeklyTasks: Task[];
weekly="weekly";
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    
  }

}
