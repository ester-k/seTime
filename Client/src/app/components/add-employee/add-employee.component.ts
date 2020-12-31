import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/models/Roles';
import { User } from 'src/app/models/user';
import { SignInService } from 'src/app/services/sign-in.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { SignInComponent } from '../sign-in/sign-in.component';
import { ToolBarComponent } from '../tool-bar/tool-bar.component';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  errorMessage: any;
  isSignUpFailed: boolean;
  isSuccessful: boolean;

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<ToolBarComponent>,
    private userService: UserService, private signIn: SignInService, private authService: AuthService) { }
  addEmployeeForm;
  employeePassword: string;
  user = localStorage.getItem('userName');
  rolesList: Role[];
  selected;
  ngOnInit(): void {
    this.getRolestList();

    this.addEmployeeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email]))
    })
  }

  createUser() {
    const user = new User()
    user.userName = this.addEmployeeForm.controls.name.value;
    user.role = this.addEmployeeForm.controls.role.value;
    user.email = this.addEmployeeForm.controls.email.value;
    user.password = this.createPassword();
    console.log(user.role);

    // user.managerId = this.signIn.CurrentUser.roleId;
    this.authService.register(user)
      .subscribe((user) => {
        console.log("the user is:");
        console.log(user);
      });
      this.authService.register(user).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.addEmployeeForm.controls.name.setErrors({ 'MployName Error': true });
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;

        }
      );
  }
  createPassword() {
    let x = Math.floor(Math.random() * (10000000 - 100000 + 1)) + 1000000;
    console.log(x);
    return x.toString();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getRolestList() {
    this.userService
      .getRolesList()
      .subscribe((roles: Role[]) => {
        this.rolesList = roles;
      });
  }

}
