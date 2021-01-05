import { Component, OnInit, Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileImage:Array < File > ;
  url = 'http://localhost:4000/user';

  constructor(
    @Optional() public dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}
  setProfile() {}
  logOut() {
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    this.router.navigate(['/signIn']);
  }
  uploadImage(event) {
    this.profileImage = event.target.files;
    console.log(this.profileImage);
  }
  onUpload() {
    // const uploadData = new FormData();
    // uploadData.append('myFile', this.profileImage, this.profileImage.name);
    // console.log(uploadData['myFile']);

    // this.userService.uploadImage(uploadData).subscribe((res) => {
    //   console.log(res);
    // });
    let formData = new FormData();
    for (var i = 0; i < this.profileImage.length; i++) {
        formData.append("uploads[]", this.profileImage[i], this.profileImage[i].name);
    }
    this.http.post(`${this.url}/uploadImage`, formData)
    .subscribe((response) => {
         console.log('response received is ', response);
    })

     }
}
