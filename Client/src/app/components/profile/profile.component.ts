import { Component, Inject, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
src:string='assets/img/default.jpg';
@ViewChild("template")
userDialogTemplate: TemplateRef<any>;
  constructor(
    @Optional() public dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    // @Inject(MAT_DIALOG_DATA) public data: {name: string},
    
  ) {}

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('currentUser')).image==undefined){
      if(JSON.parse(localStorage.getItem('currentUser')).gender=="male")
         this.src = 'assets/img/male.jpg' ;
   
        if(JSON.parse(localStorage.getItem('currentUser')).gender=="female") 
           this.src = 'assets/img/female.jpg';
       
      }
    else
      this.src = 'assets/img/' + JSON.parse(localStorage.getItem('currentUser')).image;

     }
  setProfile() {}
  logOut() {
    localStorage.removeItem('currentUser');
    this.tokenStorageService.signOut();
    this.router.navigate(['/signIn']);
  }
  
  openDialog(templateRef) {
   this.dialog.open(this.userDialogTemplate, {
     width: '1000px',
    data:{src:this.src}
   });
  }
}