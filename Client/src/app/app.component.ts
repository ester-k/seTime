import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
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
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(private router: Router, private tokenStorageService: TokenStorageService, private permissionsService: NgxPermissionsService, private http: HttpClient) { }
  ngOnInit() {
    // const perm = ["ADMIN", "EDITOR"];
    // this.permissionsService.loadPermissions(perm);
    // this.http.get('url').subscribe((permissions) => {
    //   this.permissionsService.loadPermissions(permissions);
    // })
  }
  get isUser() {
    return localStorage.getItem('userId') !== "" && localStorage.getItem('userId') != null;

  }
  // localStorage.setItem('userId', '');
  //   this.userId = localStorage.getItem('userId');
  //   if (this.userId == '') this.router.navigate(['/signIn']);
  //   this.userId = localStorage.getItem('userId');
  //   this.isLoggedIn = !!this.tokenStorageService.getToken();

  //   if (this.isLoggedIn) {
  //     const user = this.tokenStorageService.getUser();
  //     this.roles = user.roles;
  //     this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
  //     this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
  //     this.username = user.username;
  //   }

  // }

  // logout(): void {
  //   this.tokenStorageService.signOut();
  //   window.location.reload();
  // }


}
