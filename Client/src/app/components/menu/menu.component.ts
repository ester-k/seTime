import { Component, OnInit } from '@angular/core';
import { SignInService } from 'src/app/services/sign-in.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(private signIn: SignInService) { }
  addTask = false;
  ngOnInit(): void {
  } 
}
