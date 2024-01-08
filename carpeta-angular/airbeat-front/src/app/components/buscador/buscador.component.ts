import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren, AfterViewInit, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationStart, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BucadorServiciosService } from '../../services/bucador.servicios.service';
import { Howl, Howler } from "howler";
import { songs } from '../../services/bucador.servicios.service';
import { Router } from '@angular/router';
import { busqueda } from '../../services/bucador.servicios.service';
import { Subscription, catchError } from 'rxjs';
import { error } from 'console';


@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterLink, RouterLinkActive],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})

export class BuscadorComponent implements OnInit,AfterViewInit{
  @ViewChildren('btnEscuchar') btns!: QueryList<ElementRef>;
  @ViewChildren('cartaDiv') cartas!: QueryList<ElementRef>;
  @ViewChildren('btnPlay') btn_play!: QueryList<ElementRef>;
  @ViewChildren('secundarias') secun!: QueryList<ElementRef>;
  @ViewChildren('btnSecundarias') btnSecun!: QueryList<ElementRef>;


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
  albums: songs[]= []
  mostrarAlbums:boolean= true


  constructor(private buscador: BucadorServiciosService, private router: Router, private renderer:Renderer2) {
  }

  ngOnInit(): void {
    this.buscador.obtenerMostrarAlbum().subscribe(valor => {
      console.log(valor)
      this.mostrarAlbums = valor;
    });

    this.buscador.tarerAlbums().subscribe({
      next:(data:any)=>{
        this.albums= data.albums
      },
      error: (error)=>{
        console.log(error)
      }
    })

    if(this.mostrarAlbums){
      this.buscador.traerHistorial().subscribe({
        next:(data:any)=>{
          this.historial = data.historial
        },
        error: (error)=>{
          return error
        }
      })
    }else{
      this.buscador.traerHistorialCom().subscribe({
        next:(data:any)=>{
          this.historial = data.historial
        },
        error: (error)=>{
          return error
        }
      })
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      for(let i = 0; i < this.cartas.length; i++){
        const carta = this.cartas.get(i);
        const boton = this.btn_play.get(i)
        if (carta) {
          this.renderer.listen(carta.nativeElement, 'mouseover', () => {
            this.renderer.addClass(boton?.nativeElement, "cont_block")
          });
          this.renderer.listen(carta.nativeElement, 'mouseout', ()=>{
            this.renderer.removeClass(boton?.nativeElement, "cont_block")
          })
        }
      }
    }, 1000);
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
            setTimeout(() => {
              for(let i = 0; i < this.secun.length; i++){
                const cartaSe = this.secun.get(i);
                const botonSe = this.btnSecun.get(i)
        
                if (cartaSe) {
                  this.renderer.listen(cartaSe.nativeElement, 'mouseover', () => {
                    this.renderer.addClass(botonSe?.nativeElement, "cont_block_secundarias")
                  });
                  this.renderer.listen(cartaSe.nativeElement, 'mouseout', ()=>{
                    this.renderer.removeClass(botonSe?.nativeElement, "cont_block_secundarias")
                  })
                }
              }
            }, 1000);
            // this.formatTime()
          },
          error: (error) => {
            console.log(error);
          }
        });
      }else{
        this.router.navigate(['/search']);
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


  irAtras(){
    // if(this.router.url === "home"){

    // }
    this.router.navigate(['/home']);
  }







}



