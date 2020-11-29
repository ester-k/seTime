import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { SignInService } from 'src/app/services/sign-in.service';
import { UserService } from 'src/app/services/user.service';
import { SignInComponent } from '../sign-in/sign-in.component';
import { ToolBarComponent } from '../tool-bar/tool-bar.component';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<ToolBarComponent>,
    private userService: UserService, private signIn: SignInService) { }
  addEmployeeForm;
  employeePassword: string;
  user = localStorage.getItem('userName');
  ngOnInit(): void {
       this.addEmployeeForm = new FormGroup({
      employeeName: new FormControl('', Validators.required),
      employeeRole: new FormControl('', Validators.required),
      employeeEmail: new FormControl('', Validators.compose([Validators.required, Validators.email]))
    })
  }

   createUser() {
    const user = new User()
    user.userName = this.addEmployeeForm.controls.employeeName.value;
    user.roleId = this.addEmployeeForm.controls.employeeRole.value;
    user.email = this.addEmployeeForm.controls.employeeEmail.value;
    user.managerId = this.signIn.CurrentUser.roleId;
     this.userService.createUser(user)
       .subscribe((user) => {
        console.log(user);
     });
  }

  private getUser() {
    this.userService.getUser()
      .subscribe((user) => {
        console.log(user);
      });
  }

  cratePassword() {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }


}
