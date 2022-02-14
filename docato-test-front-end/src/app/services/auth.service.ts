import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = 'http://localhost:3000';
// const baseUrl = 'https://rotasbrasil.com.br/api/v3?pontos=Curitiba,pr;20040-070&veiculo=caminhao&eixos=6&token=fde30e05ea6403e5e8b2434b7d694411';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public result: any
  constructor(private http: HttpClient) { }

  validateLogin(username: String, password: String): Observable<boolean> {
    return this.http.post(baseUrl + '/api/login', {username: username, password: password})
    .pipe(
      map(result => {
        this.result = result
        localStorage.setItem('access_token', this.result.token);
        localStorage.setItem('access_user', this.result.username);
        return true;
      })
    );
  }


  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_user');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  public get getUser() {
    let user = localStorage.getItem('access_user')
    return user;
  }
  // getAll(): Observable<any> {
  //   return this.http.get(baseUrl);
  // }
  // get(id: any): Observable<any> {
  //   return this.http.get(`${baseUrl}/${id}`);
  // }
  // create(data: any): Observable<any> {
  //   return this.http.post(baseUrl, data);
  // }
  // update(id: any, data: any): Observable<any> {
  //   return this.http.put(`${baseUrl}/${id}`, data);
  // }
  // delete(id: any): Observable<any> {
  //   return this.http.delete(`${baseUrl}/${id}`);
  // }
  // deleteAll(): Observable<any> {
  //   return this.http.delete(baseUrl);
  // }
  // findByTitle(title: any): Observable<any> {
  //   return this.http.get(`${baseUrl}?title=${title}`);
  // }
}

