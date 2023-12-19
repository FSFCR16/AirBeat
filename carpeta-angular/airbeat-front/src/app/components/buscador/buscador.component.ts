import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { BucadorServiciosService } from '../../services/bucador.servicios.service';
import { Howl, Howler } from "howler";
import { songs } from '../../services/bucador.servicios.service';
import { Router } from '@angular/router';
import { error } from 'console';


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
  valorInput:string=""
  sound: Howl | undefined;
  datos: songs[]= [];
  busqueda: string = '';
  isFocused: boolean = false;

  constructor(private buscador: BucadorServiciosService, private router: Router) {
  }

  ngOnInit(): void {

  }


  inputChanged(event: Event) {
    this.valorInput = (event.target as HTMLInputElement).value;
    this.router.navigateByUrl(`/search/${encodeURIComponent(this.valorInput)}`);

    if(this.valorInput !== ""){
      this.buscador.catchSongs(this.valorInput).subscribe({
        next: (data: songs) => {
            if(this.datos.length <= 1){
              this.datos.pop()
              this.datos.push(data)
            }
          },
        error: (error) => {
          console.log(error);
        },
      });
    }
    console.log(this.datos)

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

  async saveHistorial(idSong:string){
    (await this.buscador.saveSongs(idSong)).subscribe({
      next: (data)=>{
        console.log(data)
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

}



