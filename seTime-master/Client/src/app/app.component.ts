import { HttpClient } from '@angular/common/http';
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
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
      ) {}

  ngOnInit() {
    if (localStorage.getItem('currentUser') == '') {
      this.router.navigate(['/signIn']);
    }
  }
  get isUser() {
    
    return (
      localStorage.getItem('currentUser') !== '' &&
      localStorage.getItem('currentUser') != null
    );
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
