import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BucadorServiciosService } from '../../services/bucador.servicios.service';
import { Howl, Howler } from "howler";
import { getEnabledCategories } from 'trace_events';


@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent implements OnInit {
  @ViewChildren('btnEscuchar') btns!: QueryList<ElementRef>;
  enlacesCanciones: string[] = [];
  sound: Howl | undefined;
  datos: any;

  constructor(private buscador: BucadorServiciosService) { }

  ngOnInit(): void {
    this.buscador.traerCanciones().subscribe({
      next: (data: any) => {
        this.datos = data[0].songs;
      },
      error: (error) => {
        console.log(error);
      },
    });
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
}



