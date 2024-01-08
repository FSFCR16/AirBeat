import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { json } from 'stream/consumers';
import { User } from './create-user.service';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';


export interface songs{
  album:{
    track_number:number,
    name_album:string
  },
  collaboration: {
    number_collaborators: number,
    collaborators_name:[string]
  },
  artist:string,
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
  _id?: any
}

interface PlaylistResponse {
  userId: string;
  songs: []; // Tipo de datos de las canciones (puede ser más específico)
}

export interface busqueda{
  _id: string,
  userId: string,
  cancionId: string,
  songArtist:string,
  songName:string,
  preview_url:string,
  songImage: [{
    img_url_64:string,
    img_url_300:string,
    img_url_640:string,
  }],
  date:Date
}
@Injectable({
  providedIn: 'root'
})
export class BucadorServiciosService {

  constructor(private http: HttpClient) { }
  private url = 'http://127.0.0.1:3000/'
  private informacionCompartidaSubject = new Subject<any>();
  private _vistaBuscador = new BehaviorSubject<string>('');

  getAlbum(nombre:string):Observable<songs[]>{
    const token = localStorage.getItem("key")

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });
    return this.http.get<songs[]>(`${this.url}songs/search/album/${nombre}`,{headers})
  }

  traerCanciones():Observable<PlaylistResponse>{
    const token = localStorage.getItem("key")

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });
    return this.http.get<PlaylistResponse>(`${this.url}update/getPlaylist`, {headers})
  }

  catchSongs(general: string):Observable<any>{
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });
    return this.http.get<any>(`${this.url}songs/search/${general}`, {headers})

  }

  saveSongs(songId: string ):Observable<busqueda>{
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });
    return this.http.get<any>(`${this.url}songs/getsongsmassive/${songId}`, {headers})
  }


  /*borrarCancion(id:string):Observable<songs>{
    return this.http.post<busqueda>(`${this.url}historial/postSong/${songId}`,{}, {headers})
  } */

  traerHistorial():Observable<[]>{
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });
    return this.http.get<[]>(`${this.url}historial/traerCanciones`, {headers})
  }

  borrarHistorial(id:string):Observable<busqueda>{
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });
    return this.http.delete<busqueda>(`${this.url}historial/eleminarHistorialId/${id}`, {headers})
  }

  guardarUltimaCancion(id:string):Observable<busqueda>{
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });
    return this.http.post<busqueda>(`${this.url}songs/musicPlayer/${id}`,{}, {headers})
  }

  tarerCancionMusicPlayer(): Observable <busqueda>{
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });
    return this.http.get<busqueda>(`${this.url}songs/music`, {headers})
  }
  guardarInformacion(cancion: any) {
    this.informacionCompartidaSubject.next(cancion);
  }

  obtenerInformacion(): Observable<any> {
    return this.informacionCompartidaSubject.asObservable();
  }

  borrarCancion(id:string):Observable<songs>{
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });
    return this.http.delete<songs>(`${this.url}songs/deletesongsforid/${id}`,{headers})
  }

  cancionesTraer(pagina: number):Observable<any>{
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });
    return this.http.get<any>(`${this.url}songs/getsongsmassive/${pagina}`, {headers})
  }


  agregarCancion(songs:songs):Observable<songs>{
    const token = localStorage.getItem("key")

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });
    return this.http.post<songs>(`${this.url}songs/postsongs`,JSON.stringify({songs}),{headers})
  }

  buscadorUsuarios(name:string):Observable<User>{
    const token = localStorage.getItem("key")

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });
    return this.http.get<User>(`${this.url}user/getUserByUsername/${name}`,{headers})
  }
  

  buscadorCanciones(name_track:string):Observable<songs>{
    const token = localStorage.getItem("key")

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });
    return this.http.get<songs>(`${this.url}songs/search/track/${name_track}`,{headers})
  }

  

  get vistaBuscador$() {
    return this._vistaBuscador.asObservable();
  }

  setVistaBuscador(value: string) {
    this._vistaBuscador.next(value);
  }
}
