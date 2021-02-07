import { Component, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
// import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Image } from 'src/app/models/image';
import { ToolBarComponent } from '../tool-bar/tool-bar.component';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { sign } from 'crypto';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  // profileImage: Array<File>;
  profileImage: File;
  galleryForm: FormGroup;
  imageFile: File = null;
  imageTitle = '';
  imageDesc = '';
  isLoadingResults = false;
  gallery: Image = {  imageUrl: '', imageTitle: '', imageDesc: '' };
  // gallery: Image = {
  //   imageUrl: '',
  // };
  isLoadingResultsTwo = true;
  url = 'http://localhost:4000/user/uploadImage';
  src;
  id: any;
  fileToUpload: File;
  upload_image: string;
  is_image_choosen: boolean;
  error_image: boolean;
  picture_missing: boolean;
  error_in_image: boolean;
  urlServer: string = this.userService.urlServer;
  urlActivities: string = this.userService.urlActivities;
  urlFolder: string = 'uploads/';
  fileReader=new FileReader();
  
  constructor(
    @Optional() public dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService, 
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // this.src=this.sign.imageSrc;
   let t= this.activeRoute.snapshot.paramMap.get("image");

     }
  setProfile() {}
  logOut() {
    localStorage.removeItem('currentUser');
    this.tokenStorageService.signOut();
    this.router.navigate(['/signIn']);
  }
  
 


 
}
