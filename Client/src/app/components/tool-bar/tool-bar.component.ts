import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { SignInService } from 'src/app/services/sign-in.service';
import { TaskService } from 'src/app/services/task.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ProfileComponent } from '../profile/profile.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { ViewChild } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css'],
})
export class ToolBarComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private permissionService: PermissionService,
    private router: Router
  ) { }
  // showMenu = true;
  // panelOpenState = false;
  // showFiller = false;
  openMenu = true;
  currentUser = new User();
  // addemployee = false;
  // addTask = false;
  isManager;
  reports = false;
  CurrentUser;
  usersRoles: any;
  ngOnInit(): void {
    this.currentUser.password = localStorage.getItem('userId');
    this.currentUser.userName = localStorage.getItem('userName');
    this.CurrentUser = localStorage.getItem('userName');
    this.usersRoles = this.permissionService.getRoleLogedIn();
    //change that only manager can see this pages.
    this.isManager = true;
  }
  openUserDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }
  openTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }
  // openProfileDialog(): void {
  //   const dialogRef = this.dialog.open(ProfileComponent, {
  //     width: '250px',
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {});
  // }
  manageWeek() {
    if (this.router.routerState.snapshot.url == "/managerScreen")
      this.router.navigate(['/userScreen']);
    else
      this.router.navigate(['/managerScreen']);

  }
}
