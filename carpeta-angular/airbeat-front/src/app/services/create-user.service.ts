import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface User{
  email: string,
  name: string,
  lastname: string,
  telefono: string,
  password: string,
  confirmPass: string,
}

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  private apiUrl = 'http://127.0.0.1:3000/user';

  constructor(private http: HttpClient) {}

  crearUsuario(user: User): Observable<User> {
    const headers = new HttpHeaders({"Content-Type": "application/json"})
    return this.http.post<User>(`${this.apiUrl}/registrate`,JSON.stringify({user}),{headers});
  }

  inicarSesion(email:string, password:string):Observable<any>{
    const headers = new HttpHeaders({"Content-Type": "application/json"})
    return this.http.post<User>(`${this.apiUrl}/login`,JSON.stringify({email,password}),{headers});
  }

  
}

