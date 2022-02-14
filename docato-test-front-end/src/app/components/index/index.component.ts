import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  panelOpenState = false;
  constructor(public authService: AuthService, public router: Router) { }

  renderProduct(){
    this.router.navigate(['products']);
  }

  renderUserList(){
    this.router.navigate(['user/list']);
  }

  ngOnInit(): void {
  }

}
