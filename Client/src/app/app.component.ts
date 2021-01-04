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
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  get isUser() {
    return (
      localStorage.getItem('userId') != '' &&
      localStorage.getItem('userId') != null
    );
  }
  ngOnInit() {
    if (localStorage.getItem('userId') == '') {
      this.router.navigate(['/signIn']);
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
}
