import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface PlaylistResponse {
  userId: string;
  songs: []; // Tipo de datos de las canciones (puede ser más específico)
}

@Injectable({
  providedIn: 'root'
})
export class BucadorServiciosService {

  constructor(private http: HttpClient) { }
  private url = 'http://127.0.0.1:3000/update'

  traerCanciones():Observable<PlaylistResponse>{
    const token = localStorage.getItem("key")

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });
    return this.http.get<PlaylistResponse>(`${this.url}/getPlaylist`, {headers})
  }
}
