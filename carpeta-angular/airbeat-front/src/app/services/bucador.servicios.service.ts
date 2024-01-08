import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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
  artist:string,
  duration_ms:any,
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
  private mostrarComponente: BehaviorSubject<boolean>;
  private mostrarAlbum:BehaviorSubject<boolean>;
  private informacionSubject = new BehaviorSubject<any>(null);
  public informacion$ = this.informacionSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { 
    this.mostrarComponente = new BehaviorSubject<boolean>(true);
    this.mostrarAlbum = new BehaviorSubject<boolean>(true);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.mostrarComponente.next(event.url !== '/login-page' &&  event.url !== '/Init' );
        // this.mostrarComponente.next(event.url !== '/Init'  );
        this.mostrarAlbum.next(event.url !== '/search/historial')
      }
    });
  }
  private url = 'http://127.0.0.1:3000/'
  private informacionCompartidaSubject = new Subject<any>();

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
    return this.http.post<busqueda>(`${this.url}historial/postSong/${songId}`,{}, {headers})
  }

  traerHistorial():Observable<[]>{
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });
    return this.http.get<[]>(`${this.url}historial/traerCanciones`, {headers})
  }
  traerHistorialCom():Observable<[]>{
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });
    return this.http.get<[]>(`${this.url}historial/traerCancionesCompletas`, {headers})
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

  tarerAlbums(): Observable <songs>{
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });

    return this.http.get<songs>(`${this.url}songs/albums`, {headers})
  }

  buscarCancion(backtrack: string): Observable<songs> {
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`
    });
    return this.http.get<songs>(`${this.url}songs/getsongsforname/${backtrack}`, { headers })

  }
  crearPlaylist(): Observable<songs> {
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`      
    });
    return this.http.post<songs>(`${this.url}update/createPlylist`,{}, { headers })

    }

  traerPlylist(id:string):Observable<{}>{
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`      
    });
    return this.http.get<{}>(`${this.url}update/getPlaylistById/${id}`, { headers })

  }

  actualizarPlaylist(id:string, idSong:string):Observable<any>{
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`      
    });
    return this.http.put<{}>(`${this.url}update/updatePlaylist/${id}/${idSong}`,{}, { headers })

  }

  actualizarNombre(id:string, name: string):Observable<any>{
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`      
    });
    return this.http.put<{}>(`${this.url}update/changeName/${id}`,JSON.stringify({namePlaylist: name}), { headers })
  }

  eliminarCancionPlaylist(id:string, idSong:string):Observable<any>{
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`      
    });
    return this.http.delete<any>(`${this.url}update/deleteSongPalylist/${id}/${idSong}`, { headers })
  }
  traerCancionAleatorias():Observable<[]>{
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`      
    });

    return this.http.get<[]>(`${this.url}songs/aleatorias`, { headers })
  }

  EliminarPlaylist(id:string):Observable<any>{
    const token = localStorage.getItem("key")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "authorization": `key ${token}`      
    });

    return this.http.delete<any>(`${this.url}update/deletePlaylist/${id}`, { headers })
  }

  guardarInfoPlaylist(data: any) {
    this.informacionSubject.next(data);
  }

  obtenerMostrarAlbum(): Observable<boolean> {
    return this.mostrarAlbum.asObservable();
  }

  verificarRuta(): Observable<boolean> {
    return this.mostrarComponente.asObservable();
  }

  guardarInformacion(cancion: any) {
    this.informacionCompartidaSubject.next(cancion);
  }

  obtenerInformacion(): Observable<any> {
    return this.informacionCompartidaSubject.asObservable();
  }



}
