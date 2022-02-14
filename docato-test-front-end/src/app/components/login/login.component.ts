import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public username: string = '';
  public password: string = '';
  public errorMessage: string | undefined;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.loggedIn){
      this.router.navigate(['index']) 
    }
  }

  submitLogin() {
    this.authService.validateLogin(this.username, this.password).subscribe(
      result => {
        // Redirect to index page
        this.router.navigate(['index']) 
      },
      err => {
        // Set message error
        this.errorMessage = err.error.message
      }
    )
  }

}
