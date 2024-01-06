import { Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { BucadorServiciosService } from '../../services/bucador.servicios.service';
import { Howl, Howler } from "howler";
import { songs } from '../../services/bucador.servicios.service';
import { Router } from '@angular/router';
import { busqueda } from '../../services/bucador.servicios.service';
import { Subscription } from 'rxjs';
import { error } from 'console';


@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, RouterOutlet,],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})

export class BuscadorComponent implements OnInit {
  @ViewChildren('btnEscuchar') btns!: QueryList<ElementRef>;
  @ViewChildren('cartaDiv') cartas!: QueryList<ElementRef>;

  private busquedaSubscription: Subscription | undefined;
  enlacesCanciones: string[] = [];
  valorInput:string=""
  sound: Howl | undefined;
  datos: songs[]= [];
  secundarias :songs[] =[]
  busqueda: string = '';
  isFocused: boolean = false;
  historial: busqueda[]=[]
  albumLength: number = 0
  tipo: string = ""


  constructor(private buscador: BucadorServiciosService, private router: Router, private renderer:Renderer2) {
  }

  ngOnInit(): void {
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



  inputChanged(event: Event) {
    this.valorInput = (event.target as HTMLInputElement).value;
    this.router.navigateByUrl(`/search/${encodeURIComponent(this.valorInput)}`);

    if (this.busquedaSubscription) {
      this.busquedaSubscription.unsubscribe();
    }

    // Realizar la búsqueda después de 500ms de inactividad del usuario
    setTimeout(() => {
      if (this.valorInput !== '') {
        this.busquedaSubscription = this.buscador.catchSongs(this.valorInput).subscribe({
          next: (data: any) => {
            console.log(data)
            this.datos = [data.resultado[0]];
            this.secundarias = data.resultado
            this.tipo = data.type
            this.albumLength = data.length
            for (let i = 0; i < this.secundarias.length; i++) {
              const formattedTime = this.formatTime(this.secundarias[i].duration_ms);
              this.secundarias[i].duration_ms = formattedTime; // Crear nueva propiedad con el tiempo formateado
            }
            // this.formatTime()
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    }, 500);

  }
  formatTime(ms: number) {
    const secs = Math.floor(ms / 1000) || 0; // Convertir milisegundos a segundos
    const minutes = Math.floor(secs / 60) || 0;
    const seconds = (secs - minutes * 60) || 0;
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
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
        console.log(error)
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
        console.log(error)
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



