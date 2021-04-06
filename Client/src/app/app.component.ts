import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService } from './services/permission.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userId: string;
  usersRoles: any;
  openMenu = true;
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private permissionService: PermissionService
  ) {}

  ngOnInit() {
    if (!localStorage.getItem('currentUser')) {
      this.router.navigate(['/signIn']);
    } else this.router.navigate(['/userScreen']);
  }
  get isUser() {
    return (
      localStorage.getItem('currentUser') !== '' &&
      localStorage.getItem('currentUser') != null
    );
  }
  get isManager() {
    this.usersRoles = this.permissionService.getRoleLogedIn();

    return (
      this.usersRoles.manager ||
      this.usersRoles.systemManager ||
      this.usersRoles.projectManager
    );
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  openCloseMenu(event) {
    this.openMenu = event;
       if (event == false) document.getElementById('menu').style.right = '-300px';
    else document.getElementById('menu').style.right = '0';
  }
}
