import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/models/Roles';
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
   // user.managerId = this.signIn.CurrentUser.roleId;
     this.userService.createUser(user)
       .subscribe((user) => {
        console.log(user);
     });
  }
  
  cratePassword() {

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
