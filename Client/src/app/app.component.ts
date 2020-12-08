import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userId: string;
  constructor(private router: Router) {}
  ngOnInit() {
    // localStorage.setItem('userId', '');
    this.userId = localStorage.getItem('userId');
    if (this.userId == '') this.router.navigate(['/signIn']);
    this.userId = localStorage.getItem('userId');
  }

  get isUser() {
      return localStorage.getItem('userId') !== "" && localStorage.getItem('userId') !=null;
        }
}
