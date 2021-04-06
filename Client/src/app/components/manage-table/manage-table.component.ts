import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UserData } from 'src/app/models/UserData';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-table',
  templateUrl: './manage-table.component.html',
  styleUrls: ['./manage-table.component.css']
})
export class ManageTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'role','action'];
  dataSource: MatTableDataSource<any>;
  someUsers = new Array();
  k = 1;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) {

    this.userService.getUsersList().subscribe((users) => {
      console.log(users);
      for (let user of users) {
        console.log(user);
        let u = new UserData();
        u.name = user.username;
        u.email = user.email;
        u.id = (this.k++).toString();
        u.role = user.role.description;
        this.someUsers.push(u);
      }
      console.log("allUsers", this.someUsers);
      this.dataSource = new MatTableDataSource(this.someUsers);
    });

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
  editUser(event){
    let user=new User();
    let rowDetails=event.srcElement.parentElement.parentElement.children;
    user.username=rowDetails[1].innerHTML;
    user.email=rowDetails[2].innerHTML;
    user.role=rowDetails[3].innerHTML;
    alert(`"האם אתה בטוח שברצונך למחוק את ה${user.role}בשם${user.username}"`);
    

  }
  deleteUser(event){
    let user=new User();
    let rowDetails=event.srcElement.parentElement.parentElement.children;
    user.username=rowDetails[1].innerHTML;
    user.email=rowDetails[2].innerHTML;
    user.role=rowDetails[3].innerHTML;
    alert(`"האם אתה בטוח שברצונך למחוק את ה${user.role}בשם${user.username}"`);
    

  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}

