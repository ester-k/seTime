import { Component, OnInit, Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileImage: File;
  constructor(@Optional() public dialog: MatDialog, private router: Router, private userService: UserService) { }

  ngOnInit(): void { }
  setProfile() { }
  logOut() {
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    this.router.navigate(['/signIn']);
  }
  uploadImage(event) {
    this.profileImage = event.target.files[0];
    console.log(this.profileImage);

  }
  
}
