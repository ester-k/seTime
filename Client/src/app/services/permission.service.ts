import { Injectable } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private roles: string[];
  isLoggedIn = false;
  manager = false;
  systemManager = false;
  projectManager = false;
  employee = false;
  client = false;
  constructor(private tokenStorageService: TokenStorageService) { }
  getRoleLogedIn() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.role;
      this.manager = this.roles.includes('מנהל');
      this.systemManager = this.roles.includes('מנהל מערכת');
      this.employee = this.roles.includes('מפתח');
      if (!this.employee)
        this.employee = this.roles.includes('מעצב');
      this.projectManager = this.roles.includes('מנהל פרויקטים');
      this.client = this.roles.includes('לקוח');
      console.log("user roles:");
      console.log(this.roles);
      return {
        manager: this.manager, systemManager: this.systemManager,
        employee: this.employee, projectManager: this.projectManager, client: this.client
      }

    }
    return false;
  }

}
