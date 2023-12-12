import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface User{
  email: string,
  nombre: string,
  apellido: string,
  telefono: string,
  password: string,
  confirmPass: string,
}

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  private apiUrl = 'http://127.0.0.1:3000/songs/login';

  constructor(private http: HttpClient) {}

  crearUsuario(usuario: User): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }
}
