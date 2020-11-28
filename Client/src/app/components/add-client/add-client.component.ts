import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { ManagerComponent } from '../manager/manager.component';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
addClientForm;
  constructor(public dialogRef: MatDialogRef<ManagerComponent>) { }

  ngOnInit(): void {
    this.addClientForm=new FormGroup({
      clientName: new FormControl('', Validators.required)
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addClient(){
   let client=new Client();
   client.name=this.addClientForm.control.clientName.value;
  }
}