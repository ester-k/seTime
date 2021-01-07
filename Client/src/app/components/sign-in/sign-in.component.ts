import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators, } from '@angular/forms';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { SignInService } from 'src/app/services/sign-in.service';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  exportAs: 'appSignin'
})
export class SignInComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  signInForm;
  @Output() signed = new EventEmitter<boolean>();
  constructor(private router: Router, private sighIn: SignInService, private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    console.log('signIn');
    this.signInForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      userPassword: new FormControl('', Validators.required),
    });
  }
  signIn() {

    const user = new User();
    user.userName = this.signInForm.controls.userName.value;
    user.password = this.signInForm.controls.userPassword.value;
    this.authService.login(user).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        localStorage.setItem('userId', this.signInForm.controls.userPassword.value);
        localStorage.setItem('userName', this.signInForm.controls.userName.value);
        this.signed.emit(false);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();

      },
      err => {
        console.log(err.error.message);
        if ("הסיסמה שגויה." == err.error.message)
          this.signInForm.controls.userPassword.setErrors({ 'userPass Error': true });
        else
          this.signInForm.controls.userName.setErrors({ 'userName Error': true });
        this.isLoginFailed = true;
        this.errorMessage = err.error.message;


      }
    );

  }
  reloadPage() {
    if (this.signInForm.valid) {
      this.router.navigate(['/userScreen']);
    }
  }
}
