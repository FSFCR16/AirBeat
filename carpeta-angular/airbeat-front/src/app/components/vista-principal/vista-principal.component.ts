import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet,RouterLink } from '@angular/router';
import { BucadorServiciosService } from '../../services/bucador.servicios.service';
import { Howl, Howler } from "howler";
import { songs } from '../../services/bucador.servicios.service';
import { Router } from '@angular/router';
import { busqueda } from '../../services/bucador.servicios.service';
import { Subscription } from 'rxjs';
import { usuarioService } from '../../services/vistaperfil.service';
import { error } from 'console';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-vista-principal',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterLink,ErrorComponent],
  templateUrl: './vista-principal.component.html',
  styleUrl: './vista-principal.component.css'
})
export class VistaPrincipalComponent implements OnInit {
  @ViewChildren('btnEscuchar') btns!: QueryList<ElementRef>;
  private busquedaSubscription: Subscription | undefined;
  enlacesCanciones: string[] = [];
  sound: Howl | undefined;
  datos: songs[]= [];
  secundarias :songs[] =[]
  isFocused: boolean = false;
  historial: busqueda[]=[]
  mostrarAlbums:boolean= true
  albums: songs[]= []
  usuario: any = {};
  alert: boolean = false;
  alerterror: boolean = false;
  alertgeneral: boolean = false;

  constructor(private usuarioService: usuarioService, private buscador: BucadorServiciosService, private router: Router) {
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    this.buscador.obtenerMostrarAlbum().subscribe(valor => {
      console.log(valor)
      this.mostrarAlbums = valor;
    });

    this.buscador.tarerAlbums().subscribe({
      next:(data:any)=>{
        this.albums= data.albums
      },
      error: (error)=>{
        if (error.status === 404) {
          this.alertgeneral = true;
          console.error('Usuario no encontrado 404:', error);
        } else if (error.status === 500) {
          this.alertgeneral = true;
          console.error('Error del servidor 500:', error);
        } else {
          this.alertgeneral = true;
          console.error('Error al obtener usuario:', error);
        }
      }
    })
    this.buscador.traerHistorial().subscribe({
      next:(data:any)=>{
        this.historial = data.historial
        console.log(this.historial)
      },
      error: (error)=>{
        return error
      }
    })
  }

  obtenerUsuario(): void {
    this.usuarioService.obtenerUsuario().subscribe(
      (data) => {
        this.usuario = data;
        console.log(data)
      },
      (error) => {
        if (error.status === 404) {
          this.alertgeneral = true;
          console.error('Usuario no encontrado 404:', error);
        } else if (error.status === 500) {
          this.alertgeneral = true;
          console.error('Error del servidor 500:', error);
        } else {
          this.alertgeneral = true;
          console.error('Error al obtener usuario:', error);
        }
      }
    );
  }

  changeColorInput(status: boolean) {
    this.isFocused = status;

  }

  cargarCancion(url: any): void {
    this.buscador.guardarInformacion(url);
  }

  saveHistorial(idSong:string){
    this.buscador.saveSongs(idSong).subscribe({
      next: (data)=>{
        console.log(data)
      },
      error:(error)=>{
        if (error.status === 404) {
          this.alertgeneral = true;
          console.error('Usuario no encontrado 404:', error);
        } else if (error.status === 500) {
          this.alertgeneral = true;
          console.error('Error del servidor 500:', error);
        } else {
          this.alertgeneral = true;
          console.error('Error al obtener usuario:', error);
        }
      }
    })
  }

  borrarDelHistorial(id:string){
    this.buscador.borrarHistorial(id).subscribe({
      next:(data)=>{
        window.location.reload()
        console.log("Eliminado correctamente: ", data)
      },
      error:(error)=>{
        if (error.status === 404) {
          this.alertgeneral = true;
          console.error('Usuario no encontrado 404:', error);
        } else if (error.status === 500) {
          this.alertgeneral = true;
          console.error('Error del servidor 500:', error);
        } else {
          this.alertgeneral = true;
          console.error('Error al obtener usuario:', error);
        }
      }
    })
  }

  ultimoClick(id:string){

    this.buscador.guardarUltimaCancion(id).subscribe({
      next:(data)=>{
        console.log("Ultima cancion ", data )

      },
      error:(error)=>{
        console.log(error)
      }
    })

  }
  
}


