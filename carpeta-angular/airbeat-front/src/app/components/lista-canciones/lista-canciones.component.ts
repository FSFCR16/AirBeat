import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { songs } from '../../services/bucador.servicios.service';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { BucadorServiciosService } from '../../services/bucador.servicios.service';
import { ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { VistaAdminComponent } from '../vista-admin/vista-admin.component';

@Component({
  selector: 'app-lista-canciones',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './lista-canciones.component.html',
  styleUrl: './lista-canciones.component.css'
})
export class ListaCancionesComponent implements OnInit {
  listaCanciones: songs[] = []
  cantidadBotones: number = 0;
  contador: number = 1;
  cancionid: any = ""


  @ViewChild('contenedorScroll') contenedorScroll!: ElementRef;
  @ViewChildren('cardTitle') cardTitles!: QueryList<ElementRef>;
  @ViewChild('modal') modal!: ElementRef;
  constructor(private user: BucadorServiciosService, private render: Renderer2, private vista: VistaAdminComponent) {


  }
  ngOnInit() {
    this.llamarApiParaObtenerCanciones(1);

  }


  ngAfterViewChecked(): void {
    this.cardTitles.forEach((cardTitle) => {
      this.checkOverflow(cardTitle.nativeElement);
    });
  }


  incrementar(n: number) {
    const nuevaPagina = this.contador + n;
    if (nuevaPagina >= 1 && nuevaPagina <= this.cantidadBotones) {
      this.llamarApiParaObtenerCanciones(nuevaPagina);
    }
  }

  llamarApiParaObtenerCanciones(pagina: number) {
    this.user.cancionesTraer(pagina).subscribe({
      next: (data) => {
        this.contador = pagina;
        this.listaCanciones = data.canciones;
        this.cantidadBotones = data.paginas;
        this.scrollContenedorArriba()
      },
      error: (error) => {
        console.error('Error al obtener canciones:', error);
      }
    }
    )
  }
  checkOverflow(element: HTMLElement | any) {
    if (element.scrollWidth > element.clientWidth) {
      element.firstChild.classList.add('animating');

    }
  }

  scrollContenedorArriba() {
    if (this.contenedorScroll && this.contenedorScroll.nativeElement) {
      this.contenedorScroll.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }


  modalPop(){
    this.vista.abrirPueba()
  }


  guardarborrarCancion(id: any ) {
    this.cancionid = id

    return this.cancionid
  }

  eliminarCancion(){
    this.user.borrarCancion(this.cancionid).subscribe({
      next:(data)=>{
        console.log("Eliminado correctamente: " ,data )
        window.location.reload()
      },
      error: (error)=>{
        console.log(error)
      }
    })
  }
}


