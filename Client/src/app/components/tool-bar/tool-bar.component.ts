import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInService } from 'src/app/services/sign-in.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  constructor(private signIn: SignInService, public dialog: MatDialog) { }
  showMenu = true;
  panelOpenState = false;
  showFiller = false;
  openMenu = true;
  currentUser;
  addemployee = false;
  addTask=false;
  ngOnInit(): void {
    this.currentUser = localStorage.getItem('userId')=='1234';

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  openTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}


