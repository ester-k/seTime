import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  // menuTooltip="";
  constructor(
    public dialog: MatDialog,
    private permissionService: PermissionService,
    private router: Router
  ) {}
  user = JSON.parse(localStorage.getItem('currentUser'));
  isManager = false;
  reports = false;
  usersRoles: any;
  time: string;
  src: string = 'assets/img/default.jpg';
  @Output() openMenuApp = new EventEmitter();
  openMenu=true;
  get manuTooltip() {
    return this.openMenu==true?"פתיחת התפריט":"סגירת התפריט";
  }
  ngOnInit(): void {
    if (this.user.image == undefined) {
      if (this.user.gender == 'male') this.src = 'assets/img/male.jpg';

      if (this.user.gender == 'female') this.src = 'assets/img/female.jpg';
    } else this.src = 'assets/img/' + this.user.image;

    this.usersRoles = this.permissionService.getRoleLogedIn();
    this.isManager =
      this.usersRoles.manager ||
      this.usersRoles.systemManager ||
      this.usersRoles.projectManager;
    let hour = new Date().getHours();
    switch (true) {
      case hour < 12:
        this.time = 'בוקר טוב';
        break;
      case hour < 16:
        this.time = 'צהרים טובים';
        break;
      case hour < 19:
        this.time = 'אחר צהרים טובים';
        break;
      case hour >= 19:
        this.time = 'ערב טוב';
        break;
      default:
        break;
    }
  }
  
  openUserDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  openTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  manageWeek() {
    if (this.router.routerState.snapshot.url == '/managerScreen')
      this.router.navigate(['/userScreen']);
    else this.router.navigate(['/managerScreen']);
  }
  openCloseMenu() {
    this.openMenu=!this.openMenu
    this.openMenuApp.emit(this.openMenu)
  }
}
