import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CreateUserService } from '../../services/create-user.service';
import { User } from '../../services/create-user.service';
import { FormControl, ReactiveFormsModule, FormGroup, Validators,FormsModule } from '@angular/forms';
import { ListaCancionesComponent } from '../lista-canciones/lista-canciones.component';
import { ElementRef } from '@angular/core';
import { BucadorServiciosService, songs } from '../../services/bucador.servicios.service';


@Component({
  selector: 'app-vista-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, ListaCancionesComponent, FormsModule],
  templateUrl: './vista-admin.component.html',
  styleUrl: './vista-admin.component.css'
})
export class VistaAdminComponent implements OnInit {

  listaUsuarios: User[] = []

  userid: any = ""

  botonEliminar: boolean = false

  loginForm: FormGroup;

  album: boolean = true

  collaboration: boolean = true

  cancionesForm: FormGroup

  vistaBuscador: string =""

  buscadorCanciones: boolean = true

  mostrarCanciones: songs[] = []
  mostrarUsuarios: User[] = []


  @ViewChild('modal') modal!: ElementRef;
  @ViewChild(ListaCancionesComponent) lista!: ListaCancionesComponent;
  @ViewChild("añadirC") añadirC!: ElementRef
  @ViewChild("contenedorHidden") hidden!: ElementRef
  @ViewChild("colaboracionHidden") colaboracion!: ElementRef
  @ViewChild("infousuario") infousuario!: ElementRef
  constructor(private user: CreateUserService, private render: Renderer2, private buscador: BucadorServiciosService) {

    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      lastname: new FormControl(),
      telefono: new FormControl(),
      name: new FormControl(),
      role: new FormControl(),
    })


    this.cancionesForm = new FormGroup({
      album: new FormGroup({
        track_number: new FormControl(null, Validators.pattern('^-?\d+$')),
        name_album: new FormControl,
      }),
      collaboration: new FormGroup({
        number_collaborators: new FormControl(null, Validators.pattern('^-?\d+$')),
        collaborators_name: new FormControl,
      }),
      artist: new FormControl(null, Validators.required),
      duration_ms: new FormControl(null,[Validators.required, Validators.pattern('^-?\d+$')]),
      explicit: new FormControl(null, Validators.required),
      img_urls: new FormGroup({
        img_url_640: new FormControl(null, Validators.required),
        img_url_300: new FormControl(null, Validators.required),
        img_url_64: new FormControl(null, Validators.required),
      }),
      name_track: new FormControl(null, Validators.required),
      preview_url: new FormControl(null, Validators.required),
      release_date: new FormControl(null, Validators.required),
    });
  }
  ngOnInit(): void {
    this.user.traerUsuarios().subscribe({
      next: (data) => {
        this.listaUsuarios = data
        console.log(this.listaUsuarios)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  actualizarDatos() {
    const camposLlenados = this.obtenerCamposRellenados()
    console.log(camposLlenados)
    const id = this.userid
    console.log(id)
    this.user.editUsers(camposLlenados, id).subscribe({
      next: (data) => {
        window.location.reload()
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  agregarSongs() {
    const camposLlenadosDos = this.obtenerCamposRellenadosDos()
    console.log(camposLlenadosDos)
    this.buscador.agregarCancion(camposLlenadosDos).subscribe({
      next: (data) => {
        window.location.reload()
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  obtenerCamposRellenadosDos() {
    const formValues = this.cancionesForm.value;
    console.log(formValues)
    const camposRellenadosDos: any = {};
    const isEmpty = (obj: any) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    };

    for (const key in formValues) {

      if (formValues[key] && !isEmpty(formValues[key])) {

        if (typeof formValues[key] === 'object') {
          camposRellenadosDos[key] = {};
          for (const subKey in formValues[key]) {
            if (formValues[key].hasOwnProperty(subKey) && formValues[key][subKey]) {
              camposRellenadosDos[key][subKey] = formValues[key][subKey];
            }
          }
        } else {
          camposRellenadosDos[key] = formValues[key];
        }
      }
    }

    return camposRellenadosDos;
  }

  obtenerCamposRellenados() {
    const formValues = this.loginForm.value;
    const camposRellenados: any = {};

    for (const key in formValues) {
      if (formValues[key]) {
        camposRellenados[key] = formValues[key];
      }
    }

    return camposRellenados
  }

  guardarborrarUser(id: any) {
    this.userid = id

    return this.userid
  }


  borrarUser(idConfirmado: any) {
    this.user.borrarUsuario(idConfirmado).subscribe({
      next: (data) => {
        window.location.reload()
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  abrirPueba() {
    const element = this.modal.nativeElement
    console.log(element)
    this.render.setStyle(element, "display", "block")
  }

  cerrarPrueba() {
    const element = this.modal.nativeElement
    console.log(element)
    this.render.setStyle(element, "display", "none")
  }


  openModel() {
    const modelDiv = document.getElementById("exampleModal");
    if (modelDiv != null) {
      modelDiv.style.display = "block";
    }
  }

  CloseModel() {
    const modelDiv = document.getElementById("exampleModal");
    if (modelDiv != null) {
      modelDiv.style.display = "none";
    }
  }


  OpenPop() {
    const modelDiv = document.getElementById("PopUp");
    if (modelDiv != null) {
      modelDiv.style.display = "block";
    }
  }

  ClosePop() {
    const modelDiv = document.getElementById("PopUp");
    if (modelDiv != null) {
      modelDiv.style.display = "none";
    }
  }

  borrarCancion() {
    this.lista.eliminarCancion()
  }


  agregarAbrir() {
    const element = this.añadirC.nativeElement
    console.log(element)
    this.render.setStyle(element, "display", "block")
  }

  agregarCerrar() {
    const element = this.añadirC.nativeElement
    console.log(element)
    this.render.setStyle(element, "display", "none")
  }

  onNoButtonClick(event: Event, element: ElementRef) {
    event.preventDefault();
    this.render.setStyle(element.nativeElement, 'display', 'none');
  }


  vistaU(){
    
    this.lista.infoC().nativeElement.setAttribute("hidden",true)
    this.infousuario.nativeElement.removeAttribute("hidden")
  }

  vistaC(){
    this.lista.infoC().nativeElement.removeAttribute("hidden")
    this.infousuario.nativeElement.setAttribute("hidden",true)
  }
  

  buscadorVista(){
    console.log(this.buscadorCanciones)
    if(!this.buscadorCanciones){
      this.buscador.buscadorUsuarios(this.vistaBuscador).subscribe({
        next: (data:any) => {
          this.mostrarUsuarios = data
          console.log(data)
        },
        error: (error) =>{
          console.log(error)
        }
      })
    }else{
      this.buscador.setVistaBuscador(this.vistaBuscador);
    }
  }


}
