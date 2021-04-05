import { Component, OnInit,Inject,Optional } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PermissionService } from 'src/app/services/permission.service';
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
  username: string;
  openedDialog: boolean;
  usersRoles: any;
  constructor(@Optional() public dialog: MatDialog,private permissionService: PermissionService) {}

  ngOnInit(): void {
    this.username =JSON.parse(localStorage.getItem('currentUser')).username; ;
    this.usersRoles = this.permissionService.getRoleLogedIn();

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
