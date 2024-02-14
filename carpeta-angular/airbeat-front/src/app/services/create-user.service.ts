import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
export interface User {
  email: string,
  name: string,
  lastname: string,
  telefono: string,
  password: string,
  confirmPass: string,
  _id?: string,
}
export interface payLoad {
  _id?: string,
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  token = "key"
  data: boolean = false
  private apiUrl = 'http://127.0.0.1:3000/user';

  constructor(private http: HttpClient, private router: Router) {
  }

  crearUsuario(user: User): Observable<User> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" })
    return this.http.post<User>(`${this.apiUrl}/registrate`, JSON.stringify({ user }), { headers });
  }

  inicarSesion(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" })
    return this.http.post<User>(`${this.apiUrl}/login`, JSON.stringify({ email, password }), { headers });
  }

  saveToken(token: any) {
    localStorage.setItem(this.token, token.token)
  }


  traerUsuarios(): Observable<[]> {
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });
    return this.http.get<[]>(
      `${this.apiUrl}/getUsers`, { headers });
  }

  borrarUsuario(id: string): Observable<User> {
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`

    });
    return this.http.delete<User>(
      `${this.apiUrl}/deleteUser/${id}`, { headers })
  }

  editUsers(userFormData: User, id: string): Observable<any> {
    const token = localStorage.getItem('key');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `key ${token}`
    });

    return this.http.put<any>(`${this.apiUrl}/editUsers/${id}`, JSON.stringify({ userFormData }), { headers });
  }

  traerCanciones(): Observable<[]> {
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });
    return this.http.get<[]>(
      `${this.apiUrl}/getsongsmassive`, { headers });
  }


}
