import { Component, EventEmitter, Input, OnInit, Output, ɵɵqueryRefresh } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { SignInService } from 'src/app/services/sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  signInForm;
  @Output() signed = new EventEmitter<boolean>();
  constructor(private router: Router, private sighIn: SignInService) {}

  ngOnInit(): void {
    console.log("signIn");
    this.signInForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    userPassword: new FormControl('', Validators.required),
    });
  }
  signIn() {
    localStorage.setItem('userId', this.signInForm.controls.userPassword.value);
    localStorage.setItem('userName', this.signInForm.controls.userName.value);

    console.log("local");
    console.log( localStorage.getItem('userId'));
    this.signed.emit(false);
    this.router.navigate(['/taskScreen']);
  }
}
