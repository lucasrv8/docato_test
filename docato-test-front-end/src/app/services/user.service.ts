import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any>{
    return this.http.get(baseUrl + '/api/user')
  }

  getUser(id: Number): Observable<any>{
    return this.http.get(baseUrl + '/api/user/'+id)
  }
  
  createUser(user: any): Observable<any>{
    return this.http.post(baseUrl + '/api/user', user)
  }
  
  updateUser(id:Number, user: any): Observable<any>{
    return this.http.put(baseUrl + '/api/user/' + id, user)
  }

  deleteUser(id:Number): Observable<any>{
    return this.http.delete(baseUrl + '/api/user/' + id)
  }
}
