import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { verify } from 'crypto';
import { UserService } from 'src/app/services/user.service';
import { PasswordVerify } from 'src/app/validators/passwordVerify';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  formBuilder: any;
  imageSrc: string | ArrayBuffer;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup(
      {
        profileName: new FormControl('', Validators.required),
        imageFile: new FormControl('', Validators.required),
        imageTitle: new FormControl('', Validators.required),
        imageDesc: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        verifyPassword: new FormControl('', Validators.required),
      },
      PasswordVerify('password', 'verifyPassword')
    );
  }
  onUpload() {
    console.log("come here");
    
    
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
          console.log('res', res);
          // this.router.navigate(['/profile', res.body]);
        }
      });


    // console.log("sigh up");
    // this.onUpload();
    // this.userService
    //   .updateUser(localStorage.getItem('currentUser'))
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
  }
}
