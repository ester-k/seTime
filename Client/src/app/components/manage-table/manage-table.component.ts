import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from 'src/app/models/Roles';
import { User } from 'src/app/models/user';
import { UserData } from 'src/app/models/UserData';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-table',
  templateUrl: './manage-table.component.html',
  styleUrls: ['./manage-table.component.css'],
})
export class ManageTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'action','_id'];
  dataSource: MatTableDataSource<any>;
  someUsers = new Array();
  saveUser: User=new User();
  k = 1;
  rolesList: Role[];
  select;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.initTable();
    this.getRolestList();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  createNewUser(user, id): UserData {
    console.log(user);
    let u = new UserData();
    u.name = user.username;
    u.email = user.email;
    u.id = id.toString();
    u.role = user.role;
    return u;
  }
  getRolestList() {
    this.userService.getRolesList().subscribe((roles: Role[]) => {
      this.rolesList = roles;
    });
  }
  initTable() {
    this.userService.getUsersList().subscribe((users) => {
      for (let user of users) {
        let u = new UserData();
        u.name = user.username;
        u.email = user.email;
        u.id = (this.k++).toString();
        u.role = user.role.description;
        u._id=user._id;
        this.someUsers.push(u);
      }
      this.dataSource = new MatTableDataSource(this.someUsers);
    });
  }
    ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }
    deleteUserServer() {
    this.userService.deleteUser(this.saveUser).subscribe((user) => {
      this.someUsers = [];
      this.k = 1;
      this.initTable();
      document.getElementById('delete').style.display = 'none';
    });
  }
  deleteUser(event) {
    this.saveAUser(event);
    document.getElementById('delete').style.display = 'block';
  }
  editUserServer(email) {  
       let user = new User();
  
  user.email=email.value
   if(this.select==undefined)
   user.role=""
   else   user.role=this.select;
   user._id=this.saveUser._id
    this.userService.updateUserByManager(user).subscribe((res) => {
      this.someUsers = [];
      this.k = 1;
      this.initTable();
      document.getElementById('edit').style.display = 'none';
    });
  }
  editUser(event) {
          this.saveAUser(event);
          document.getElementById('edit').style.display = 'block';
  }
  saveAUser(event){
    let rowDetails = event.srcElement.parentElement.parentElement.children;
    this.saveUser.username = rowDetails[1].innerHTML;
    this.saveUser.email = rowDetails[2].innerHTML;
    this.saveUser.role = rowDetails[3].innerHTML;
    this.saveUser._id=rowDetails[5].innerHTML;
  }
}
