import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { BucadorServiciosService } from '../../services/bucador.servicios.service';
import { Howl, Howler } from "howler";
import { songs } from '../../services/bucador.servicios.service';
import { Router } from '@angular/router';
import { busqueda } from '../../services/bucador.servicios.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, RouterOutlet,],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})

export class BuscadorComponent implements OnInit {
  @ViewChildren('btnEscuchar') btns!: QueryList<ElementRef>;
  private busquedaSubscription: Subscription | undefined;
  enlacesCanciones: string[] = [];
  valorInput:string=""
  sound: Howl | undefined;
  datos: songs[]= [];
  secundarias :songs[] =[]
  busqueda: string = '';
  isFocused: boolean = false;
  historial: busqueda[]=[]

  constructor(private buscador: BucadorServiciosService, private router: Router) {
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
            this.datos = [data[0]];
            this.secundarias = data
            console.log(this.datos, this.secundarias)
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    }, 500);

  }

  changeColorInput(status: boolean) {
    this.isFocused = status;

  }

  cargarCancion(url: string): void {

    if (this.sound) {
      this.sound.stop();
      this.sound.unload();
    }

    this.sound = new Howl({
      src: [url],
      format: ['mpeg'],
      preload: true,

    });
    this.sound.play();
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



}



