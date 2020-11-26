import { Optional } from '@angular/core';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
name: string;
openedDialog:boolean;
  constructor(@Optional() public dialog: MatDialog,public dialogRef: MatDialogRef<ManagerComponent>){}
  onNoClick(): void {
    this.dialogRef.close();
    this.openedDialog=false;
  }
  ngOnInit(): void {
    this.name=localStorage.getItem("userName");
  }
  openDialog(): void {
    this.openedDialog=true;
    const dialogRef = this.dialog.open(ManagerComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

    
  }

}
