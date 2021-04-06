import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { ManagerService } from 'src/app/services/manager.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { ManagerComponent } from '../manager/manager.component';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  addClientForm;
  constructor(public dialogRef: MatDialogRef<ManagerComponent>,
     private managerService: ManagerService,
     private projectService: ProjectService) { }

  ngOnInit(): void {
    this.addClientForm = new FormGroup({
      clientName: new FormControl('', Validators.required)
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addClient() {
    const client = new Client();
    client.clientName = this.addClientForm.controls.clientName.value;
    console.log(client.clientName);
    
    this.managerService.addClient(client)
    .subscribe((client) => {
      console.log(client);

    });
  }
  l()
  { 
    this.projectService.getClient().subscribe((client) => {
      console.log(client);
      
    })
  }
}
