import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { AddTaskComponent } from '../add-task/add-task.component';
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
    private permissionService: PermissionService,
    private router: Router
  ) {}

  openMenu = true;
  currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
  isManager=false;
  reports = false;
  usersRoles: any;
  src = 'assets/img/' + JSON.parse(localStorage.getItem('currentUser')).image;
  ngOnInit(): void {
    console.log('src', this.src);
    this.usersRoles = this.permissionService.getRoleLogedIn();
    this.isManager =
      this.usersRoles.manager ||
      this.usersRoles.systemManager ||
      this.usersRoles.projectManager;
  }
  openUserDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  openTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  manageWeek() {
    if (this.router.routerState.snapshot.url == '/managerScreen')
      this.router.navigate(['/userScreen']);
    else this.router.navigate(['/managerScreen']);
  }
}
