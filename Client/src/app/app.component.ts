import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userId: string;
  private roles: string[];
  isLoggedIn = false;

  manager = false;
  systemAdministrator = false;
  projectManager = false;
  programmer = false;
  designer = false;
  client = false;
  username: string;
  showModeratorBoard=false
  constructor(private router: Router, private tokenStorageService: TokenStorageService, private http: HttpClient) { }

  get isUser() {
    return localStorage.getItem('userId') !== "" && localStorage.getItem('userId') != null;

  }
  ngOnInit() {
    if (localStorage.getItem('userId') == '') {
      this.router.navigate(['/signIn']);
    }

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.manager = this.roles.includes('מנהל');
      this.showModeratorBoard=this.roles.includes('מנהל');
      this.systemAdministrator = this.roles.includes('מנהל מערכת');
      this.programmer = this.roles.includes('מפתח');
      this.designer = this.roles.includes('מעצב');
      this.projectManager = this.roles.includes('מנהל פרויקט');
      this.client = this.roles.includes('לקוח');

      console.log(this.roles);

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();

  }

}