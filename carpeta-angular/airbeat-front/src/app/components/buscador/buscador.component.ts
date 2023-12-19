import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { BucadorServiciosService } from '../../services/bucador.servicios.service';
import { Howl, Howler } from "howler";
import { Router } from '@angular/router';


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
  busqueda: string = '';
  isFocused: boolean = false;

  constructor(private buscador: BucadorServiciosService, private router: Router) {
  }

  ngOnInit(): void {

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

  inputChanged(event: Event) {
    const valorInput = (event.target as HTMLInputElement).value;
    if(valorInput !== ""){
      this.buscador.catchSongs(valorInput).subscribe({
        next: (data: any) => {
          console.log(data)
          this.datos
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  changeColorInput(status: boolean) {
    this.isFocused = status;
    console.log(this.isFocused)
  }

}



