import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { json } from 'stream/consumers';

export interface songs{
  album:{
    trakc_number:number,
    name_album:string
  },
  collaboration: {
    number_collaborators: number,
    collaborators_name:[string]
  },
  duration_ms:number,
  explicit: boolean,
  img_urls: {
    img_url_640:string,
    img_url_300:string,
    img_url_64:string,
  },
  name_track:string,
  preview_url: string,
  release_date: Date,
  _id: string
}

interface PlaylistResponse {
  userId: string;
  songs: []; // Tipo de datos de las canciones (puede ser más específico)
}


export interface busqueda{
  _id: string,
  userId: string,
  cancionId: string,
  songName:string,
  songImage: [string],
  date:Date
}
@Injectable({
  providedIn: 'root'
})
export class BucadorServiciosService {

  constructor(private http: HttpClient) { }
  private url = 'http://127.0.0.1:3000/'

  traerCanciones():Observable<PlaylistResponse>{
    const token = localStorage.getItem("key")

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });
    return this.http.get<PlaylistResponse>(`${this.url}update/getPlaylist`, {headers})
  }

  catchSongs(name_track: string):Observable<any>{
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });
    return this.http.get<any>(`${this.url}songs/getsongsforname/${name_track}`, {headers})

  }

  saveSongs(songId: string ):Observable<busqueda>{
    const token = localStorage.getItem("key")
    console.log(token)
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });
    return this.http.post<busqueda>(`${this.url}historial/postSong/${songId}`,{}, {headers})
  }
  
}
