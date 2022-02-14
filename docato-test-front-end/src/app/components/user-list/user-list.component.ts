import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  users: any

  constructor(private userService: UserService, private router: Router, public _snackBar: MatSnackBar, private routerActive: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.getAllUsers()


    if (this.routerActive.snapshot.queryParamMap.get('showMessageNewUser') == 'true') {
      this.openToast("Usuário criado com suceeso!")
      this.clearRouteParams('showMessageNewUser')
    }else if(this.routerActive.snapshot.queryParamMap.get('showMessageUpdateUser') == 'true'){
      this.openToast("Usuário atualizado com suceeso!")
      this.clearRouteParams('showMessageUpdateUser')
    }
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
        if (this.users.status_code == 200) {
          this.users = this.users.users;
        } else {
          this.users = [];
        }
      },
      error => {
        this.users = [];
      });
  }

  addUser() {
    this.router.navigate(['user/create'])
  }

  editUser(id: number) {
    this.router.navigate(['user/edit', id])

  }

  confirmDelete(id: Number, name: string) {
    if (confirm("Tem certeza que quer deletar o usuário: " + name + "?")) {
      this.deleteUser(id)
    }
  }

  deleteUser(id: Number) {
    this.userService.deleteUser(id).subscribe(
      data => {
        // Toast info delete user
        this._snackBar.open("Usuário removido com suceeso!", "Fechar", {
          duration: 5 * 1000,
          verticalPosition: 'top'
        })
        
        // Update user list
        this.getAllUsers()
      },
      error => {
        // Toast info error delete user
        this._snackBar.open("Ocorreu um problema ao remover o usuário!", "Fechar", {
          duration: 5 * 1000,
          verticalPosition: 'top'
        })
      });
  }

  openToast(message:string){
    this._snackBar.open(message, "Fechar", {
      duration: 5 * 1000,
      verticalPosition: 'top'
    })
  }

  clearRouteParams(params:string){
    this.router.navigate([], {
      queryParams: {
        [params]: null,
      },
      queryParamsHandling: 'merge'
    })
  }
}


