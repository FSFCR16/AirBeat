import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { User } from './create-user.service';

@Injectable({
  providedIn: 'root'
})
export class usuarioService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://127.0.0.1:3000/user'

  obtenerUsuario(): Observable<any> {
    const token = localStorage.getItem('key');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `key ${token}`,
    });

    return this.http.get<any>(`${this.apiUrl}/getuser`, { headers }) ;
  }

  editUser(userFormData: User): Observable<any> {
    const token = localStorage.getItem('key');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `key ${token}`
    });

    return this.http.put<any>(`${this.apiUrl}/editUser`, JSON.stringify({ userFormData }), { headers });
  }
}



