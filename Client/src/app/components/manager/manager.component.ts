import { Optional } from '@angular/core';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddClientComponent } from '../add-client/add-client.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { AddProjectComponent } from '../add-project/add-project.component';
import { SubprojectComponent } from '../subproject/subproject.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
})
export class ManagerComponent implements OnInit {
  userName: string;
  openedDialog: boolean;
  constructor(@Optional() public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  openSubprojectDialog(): void {
    console.log('subproject dialog');
    const dialogRef = this.dialog.open(SubprojectComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  openProjectDialog(): void {
    console.log('project dialog');
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  openUserDialog(): void {
    console.log('project dialog');
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
