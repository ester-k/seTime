import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/Roles';
import { signRequest } from 'src/app/models/signRequest';
import { SignInService } from 'src/app/services/sign-in.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(private userService: UserService, private router: Router,private signService:SignInService) {}
  signUpForm: FormGroup;
  imageSrc: string | ArrayBuffer;
  // isActive=true;
  requstForm;
  rolesList: Role[];
  selected; 
   passwordError = '';

get isActive(){
  return localStorage.getItem('currentUser');
}

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

    this.requstForm = new FormGroup({
      name: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      email: new FormControl('',Validators.compose([ Validators.required,Validators.email])),
      massage: new FormControl('', Validators.required),
    });
    this.getRolestList();
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
  getRolestList() {
    this.userService.getRolesList().subscribe((roles: Role[]) => {
      this.rolesList = roles;
    });
  }
  submit() {
    let form=this.requstForm.controls;
    let req=new signRequest()
   req.name=form.name.value;
   req.role=form.role.value;
   req.email=form.email.value;
   req.massage=form.massage.value;

    this.signService.addSignRequest(req).subscribe((res)=>{
console.log(res);
document.getElementById("requestForm").setAttribute("style","display:none");
// this.requstForm.hide;
    })
  }
}
