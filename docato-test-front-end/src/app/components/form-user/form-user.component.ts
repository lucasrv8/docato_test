import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
  public name: String | undefined
  public username: String | undefined
  public password: String | undefined
  public confirmePassword: String | undefined
  public email: String | undefined
  public cpf: String | undefined
  public errorsMessages = []  as  any
  public infoMessage: String | undefined
  public id: Number | undefined

  constructor(private userService: UserService, private routerActive: ActivatedRoute, private router:Router) {
    this.id = this.routerActive.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.routerActive.snapshot.params['id'] != undefined) {
      this.getUser(this.routerActive.snapshot.params['id'])
    }
  }

  async submit() {
    //? Update new user
    if (this.id != null && this.id != undefined) {
      if (this.confirmePassword == this.password && await this.validatePassword(this.password, this.confirmePassword)) {
        await this.userService.updateUser(this.id, { username: this.username, password: this.password, cpf: this.cpf, email: this.email, name: this.name }).subscribe(
          data => {
            console.log(data);

            this.errorsMessages = []
            this.infoMessage = 'Usuário atualizado com sucesso!'
            this.router.navigate(['user/list'], {queryParams:{showMessageUpdateUser: true}})
          },
          error => {
            this.infoMessage = undefined
            this.errorsMessages = error.error.errors
            console.log(this.errorsMessages);
            
          });
      } else {
        this.errorsMessages = [{
          field: 'Senha e Confirmar senha',
          message: 'Os campos não são iguais os estão nulos',
          rejectValue: 'Diferentes ou nulos'
        }]
      }
    } else {
      //? Create new user
      await this.userService.createUser({ username: this.username, password: this.password, cpf: this.cpf, email: this.email, name: this.name }).subscribe(
        data => {
          this.errorsMessages = []
          this.infoMessage = 'Usuário criado com sucesso!'
          this.router.navigate(['user/list'], {queryParams:{showMessageNewUser: true}})
        },
        error => {
          this.infoMessage = undefined
          this.errorsMessages = error.error.errors
        });
    }
  }

  async getUser(id: Number) {
    // Get user user
    await this.userService.getUser(id).subscribe(
      data => {
        console.log(data);
        this.name = data.user.name
        this.email = data.user.email
        this.username = data.user.username
        this.cpf = data.user.cpf
      },
      error => {
      });

  }

  async validatePassword(password:String|undefined, confirmePassword:String|undefined){
    if(password == undefined  || confirmePassword == undefined){
      return false
    }
    if(password.length == 0  || confirmePassword.length == 0){
      return false
    }
    return true
  }

}
