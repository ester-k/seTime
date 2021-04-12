import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PasswordVerify } from 'src/app/validators/passwordVerify';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  imageSrc: string | ArrayBuffer;
  passwordError = '';
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup(
      {
        profileName: new FormControl('', Validators.required),
        imageFile: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        verifyPassword: new FormControl('', Validators.required),
      }
      // PasswordVerify('password', 'verifyPassword')
    );
  }
  passwordVerify() {
   
    if (
      this.signUpForm.controls['password'].value.trim() ==
      this.signUpForm.controls['verifyPassword'].value.trim()
    )
      this.passwordError = null;
    else {
      this.passwordError = 'הסיסמה שהזנת אינה תואמת';
      this.signUpForm.controls.verifyPassword.setErrors({
        passwordDismatch: true,
      });
    }
  }
  signUp() {
    if (this.signUpForm.valid) {
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
  }
}
