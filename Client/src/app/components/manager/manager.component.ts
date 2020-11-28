import { Optional } from '@angular/core';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddClientComponent } from '../add-client/add-client.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
})
export class ManagerComponent implements OnInit {
  name: string;
  openedDialog: boolean;
  constructor(
    @Optional() public dialog: MatDialog,
    //
  ) {}
  
  ngOnInit(): void {
    this.name = localStorage.getItem('userName');
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
