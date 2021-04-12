import {
  Component,
  Inject,
  OnInit,
  Optional,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  src: string = 'assets/img/default.jpg';
  @ViewChild('template')
  userDialogTemplate: TemplateRef<any>;
  constructor(
    @Optional() public dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private tokenStorageService: TokenStorageService
    // @Inject(MAT_DIALOG_DATA) public data: {name: string},
  ) {}
  signUpForm: FormGroup;
  user = JSON.parse(localStorage.getItem('currentUser'));
  imageSrc: string | ArrayBuffer;
  isOpen = false;
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      profileName: new FormControl('', Validators.required),
      imageFile: new FormControl(''),
      password: new FormControl('', Validators.required),
      verifyPassword: new FormControl('', Validators.required),
    });

    if (this.user.image == undefined) {
      if (this.user.gender == 'male') this.src = 'assets/img/male.jpg';
      if (this.user.gender == 'female') this.src = 'assets/img/female.jpg';
    } else this.src = 'assets/img/' + this.user.image;
  }
  setProfile() {}
  logOut() {
    localStorage.removeItem('currentUser');
    this.tokenStorageService.signOut();
    this.router.navigate(['/signIn']);
  }
  signUp() {
    const reader = new FileReader();
    reader.onload = (e) => (this.imageSrc = reader.result);
    reader.readAsDataURL(this.signUpForm.get('imageFile').value._files[0]);
    this.userService
      .updateUser(
        this.signUpForm.value,
        this.signUpForm.get('imageFile').value._files[0]
      )
      .subscribe((res) => {
        if (res.body) {
          localStorage.setItem('currentUser', JSON.stringify(res.body));
          console.log('current', localStorage.getItem('currentUser'));

          this.router.navigate(['/userScreen', res.body]);
        }
      });
  }
  openDialog() {
    this.dialog.open(SignUpComponent, {
      width: '800px',
      data: { src: this.src },
    });
    this.isOpen = true;
  }
}
