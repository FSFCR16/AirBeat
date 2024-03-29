import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { BucadorServiciosService, songs } from '../../services/bucador.servicios.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { error } from 'console';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from '../error/error.component';
import { usuarioService } from '../../services/vistaperfil.service';
//import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ErrorComponent,RouterModule],
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit, AfterViewInit {
  cancion_track: string = ""
  nombreNuevo: string = ""
  btnOprimido: boolean = false
  canciones_encontradas: songs[] = []
  infoplaylist: any;
  idSong: string = ""
  cacniones_playlist: songs[] = []
  isFocused: boolean = false;
  img: string = ""
  err: boolean = false
  alert: boolean = false;
  alerterror: boolean = false;
  alertgeneral: boolean = false;
  usuario: any = {};
  cancionesPredeterminadas: songs[] = []
  @ViewChildren('secundarias') secun!: QueryList<ElementRef>;
  @ViewChildren('btnSecundarias') btnSecun!: QueryList<ElementRef>;

  constructor(private buscador: BucadorServiciosService, private usuarioService: usuarioService, private router: Router, private renderer: Renderer2) { }
  ngOnInit() {
    this.obtenerUsuario();
    const id = this.router.url.split("/").filter((elemento) => {
      return elemento !== ""
    })[1]

    this.buscador.traerPlylist(id).subscribe({
      next: (data: any) => {
        this.infoplaylist = data[0]
        this.cacniones_playlist = data[0].songs
        this.img = data[0].songs[0].img_urls.img_url_300
      },
      error: (error) => {
        if (error.error.message === "Playlist no encontarda") {
          this.err = true
        }
      }
    });


    this.buscador.traerCancionAleatorias().subscribe({
      next: (data: any) => {
        this.cancionesPredeterminadas = data
        console.log(data)
      },
      error: (error) => {
        if (error.status === 404) {
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
  ngAfterViewInit() {
    setTimeout(() => {
      for (let i = 0; i < this.secun.length; i++) {
        const cartaSe = this.secun.get(i);
        const botonSe = this.btnSecun.get(i)

        if (cartaSe) {
          this.renderer.listen(cartaSe.nativeElement, 'mouseover', () => {
            this.renderer.addClass(botonSe?.nativeElement, "cont_block_secundarias")
          });
          this.renderer.listen(cartaSe.nativeElement, 'mouseout', () => {
            this.renderer.removeClass(botonSe?.nativeElement, "cont_block_secundarias")
          })
        }
      }
    }, 1000);
  }
  changeColorInput(status: boolean) {
    this.isFocused = status;

  }

  cambiarNombre() {
    console.log(this.nombreNuevo)
    const id = this.router.url.split("/").filter((elemento) => {
      return elemento !== ""
    })[1]

    this.buscador.actualizarNombre(id, this.nombreNuevo).subscribe({
      next: (data: any) => {
        console.log("Nombre cambiado", data)
        window.location.reload()

      },
      error: (error) => {
        if (error.status === 404) {
          console.error('Cambio no encontrado 404:', error);
        } else if (error.status === 500) {
          this.alertgeneral = true;
          console.error('Error del servidor 500:', error);
        } else {
          this.alertgeneral = true;
          console.error('Error al actualizar Nombre:', error);
        }
        console.log(error);
      }

    })
  }



  mostraValor() {
    this.buscador.buscarCancion(this.cancion_track).subscribe({
      next: (data: any) => {
        console.log(data);
        this.canciones_encontradas = data;
        console.log(this.canciones_encontradas)

      },
      error: (error) => {
        if (error.status === 404) {
          console.error(' No encontrado 404:', error);
        } else if (error.status === 500) {
          this.alertgeneral = true;
          console.error('Error del servidor 500:', error);
        } else {
          this.alertgeneral = true;
          console.error('Erro desconocido:', error);
          console.log(error);
        }

      }
    }

    )
  }

  anadirCancion(id: string) {
    const idPlaylist = this.router.url.split("/").filter((elemento) => {
      return elemento !== ""
    })[1]
    this.buscador.actualizarPlaylist(idPlaylist, id).subscribe({
      next: (data: any) => {
        console.log("cancion agregada", data)
        window.location.reload()
      },
      error: (error) => {
        if (error.status === 404) {
          console.error(' No encontrado 404:', error);
        } else if (error.status === 500) {
          this.alertgeneral = true;
          console.error('Error del servidor 500:', error);
        } else {
          this.alertgeneral = true;
          console.error('Error desconocido:', error);
          console.log(error);
        }
      }
    })
  }

  eliminarCancion(idSong: string) {
    const idPlaylist = this.router.url.split("/").filter((elemento) => {
      return elemento !== ""
    })[1]
    this.buscador.eliminarCancionPlaylist(idPlaylist, idSong).subscribe({
      next: (data: any) => {
        console.log("cancion eliminada", data)
        window.location.reload()
      },
      error: (error) => {
        if (error.status === 404) {
          console.error(' No encontrado 404:', error);
        } else if (error.status === 500) {
          this.alertgeneral = true;
          console.error('Error del servidor 500:', error);
        } else {
          this.alertgeneral = true;
          console.error('Error desconocido:', error);
          console.log(error);
        }
      }
    })

  }


  cargarCancion(url: any): void {
    this.buscador.guardarInformacion(url);
  }
}


