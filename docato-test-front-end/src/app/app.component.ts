import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router) { }
  title = 'docato-test-front-end';
  
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
