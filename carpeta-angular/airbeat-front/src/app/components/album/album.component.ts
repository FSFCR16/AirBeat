import { Component,ElementRef,OnInit, QueryList, Renderer2, ViewChildren} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BucadorServiciosService, songs } from '../../services/bucador.servicios.service';
import { ErrorComponent } from '../error/error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule,ErrorComponent],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent implements OnInit {
  tracks:songs[]=[]
  imgAlb:string=""
  alerta:boolean=false
  name:string = ""
  numeroCarta: number = 1;
  @ViewChildren('cartaDiv') cartas!: QueryList<ElementRef>;
  @ViewChildren('btnPlay') btn_play!: QueryList<ElementRef>;
  constructor(private album:BucadorServiciosService, private router:Router, private renderer: Renderer2){

  }
  
  ngOnInit(): void {
    const name= this.router.url.split("/").filter((elemento)=>{
      return elemento !== ""
    })[1]
    console.log(name)
    this.album.getAlbum(name).subscribe({
      next:(data)=>{
        this.tracks=data
        this.name= data[0].album.name_album
        this.imgAlb=data[0].img_urls.img_url_300
      },
      error: (error) => {
        if (error.status === 404) {
          this.alerta = true;
          console.error('Usuario no encontrado 404:', error);
        } else if (error.status === 500) {
          this.alerta = true;
          console.error('Error del servidor 500:', error);
        } else {
          this.alerta = true;
          console.error('Error al obtener usuario:', error);
        }
      }
    })
  }
  ultimoClick(id:string){

    this.album.guardarUltimaCancion(id).subscribe({
      next:(data)=>{
        console.log("Ultima cancion ", data )

      },
      error:(error)=>{
        console.log(error)
      }
    })

  }

  
  cargarCancion(url: any): void {
    this.album.guardarInformacion(url);
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

  aumentarContador() {
    if(this.numeroCarta <= this.tracks.length){
      this.numeroCarta++;
    }

  }

}
