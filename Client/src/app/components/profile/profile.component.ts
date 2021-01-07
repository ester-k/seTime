import { Component, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
// import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Image } from 'src/app/models/image';
import { ToolBarComponent } from '../tool-bar/tool-bar.component';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
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
  gallery: Image = {
    _id: '',
    imageUrl: '',
    imageTitle: '',
    imageDesc: '',
    uploaded: null,
  };
  isLoadingResultsTwo = true;
  url = 'http://localhost:4000/user/uploadImage';
  src;
  id: any;

  constructor(
    @Optional() public dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.galleryForm = this.formBuilder.group({
      imageFile: [null, Validators.required],
      imageTitle: [null, Validators.required],
      imageDesc: [null, Validators.required],
    });
    this.getGalleryDetails(this.activeRoute.snapshot.paramMap.get('id'));
  }
  setProfile() {}
  logOut() {
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    this.tokenStorageService.signOut();
    this.router.navigate(['/signIn']);
  }
  //   uploadImage(event) {
  //     this.profileImage = event.target.files[0];
  //     var t={
  //       _id: String,
  //       imageUrl: String,
  //       imageTitle: String,
  //       imageDesc: String,
  //       uploaded: Date
  //     };
  //   }
  //   onUpload() {
  //     let formData = new FormData();
  //     formData.append("img", this.profileImage  );
  // console.log("form data", formData);
  // console.log("form data image",formData.get("img"));

  //     this.http.post(this.url, formData).subscribe(
  //      (response) => {
  //     this.src=response;
  //     console.log("src", this.src )},
  //       (error) => console.log(error)
  //     )
  //  }
  onFormSubmit(): void {
    this.isLoadingResults = true;
    let galleryForm = this.galleryForm.value;
    console.log('🚀 ~ ~ onFormSubmit ~ galleryForm', galleryForm);
    let image = this.galleryForm.get('imageFile').value._files[0];
    console.log('🚀 ~  onFormSubmit ~ image', image);
    this.userService.addGallery(galleryForm, image).subscribe(
      (res: any) => {
        this.isLoadingResults = false;
        if (res.body) {
          console.log(res.body);
          this.src=res.body.imageUrl.toString();
          console.log("🚀 ~ file: profile.component.ts ~ line 105 ~ ProfileComponent ~ onFormSubmit ~ src", this.src)
          
          this.id=res.body._id;
          this.getGalleryDetails(this.id);
          // this.router.navigate(['/gallery-details', res.body._id]);
        }
      },
      (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
  getGalleryDetails(id: string): void {
    this.userService.getGalleryById(id).subscribe((data: any) => {
      this.gallery = data;
      console.log(this.gallery);
      this.isLoadingResults = false;
    });
  }
  // this.http
  //   .post(`${this.url}/uploadImage`, formData)
  //   .subscribe((response) => {
  //     console.log('response received is ', response);
  //   });
}
