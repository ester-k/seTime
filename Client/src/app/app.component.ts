import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService } from './services/permission.service';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userId: string;
  constructor(private router: Router, private tokenStorageService: TokenStorageService, private http: HttpClient, private permissionService: PermissionService) { }
  get isUser() {
    return localStorage.getItem('userId') !== "" && localStorage.getItem('userId') != null;
  }
  ngOnInit() {
    if (localStorage.getItem('userId') == '') {
      this.router.navigate(['/signIn']);
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();

  }

}