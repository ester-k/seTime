import { Component, OnInit, Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(@Optional() public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}
  setProfile() {}
  logOut() {
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    this.router.navigate(['/signIn']);
  }
}
