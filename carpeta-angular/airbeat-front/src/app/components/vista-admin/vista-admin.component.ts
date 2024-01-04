import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CreateUserService } from '../../services/create-user.service';
import { User } from '../../services/create-user.service';
import { FormControl,ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ListaCancionesComponent } from '../lista-canciones/lista-canciones.component';
import { ElementRef } from '@angular/core';
import { BucadorServiciosService } from '../../services/bucador.servicios.service';


@Component({
  selector: 'app-vista-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet,ReactiveFormsModule, ListaCancionesComponent],
  templateUrl: './vista-admin.component.html',
  styleUrl: './vista-admin.component.css'
})
export class VistaAdminComponent implements OnInit {

  listaUsuarios: User[] = []

  userid: any = ""

  botonEliminar: boolean = false

  loginForm: FormGroup;


  @ViewChild('modal') modal!: ElementRef;
  @ViewChild(ListaCancionesComponent) lista!: ListaCancionesComponent;
  constructor(private user: CreateUserService, private render: Renderer2, private buscador: BucadorServiciosService ) {

    this.loginForm= new FormGroup({
      email:new FormControl(),
      password: new FormControl(),
      lastname:new FormControl(),
      telefono:new FormControl(),
      name:new FormControl(),
    })
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

  actualizarDatos(){
    const camposLlenados = this.obtenerCamposRellenados()
    const id = this.userid
    console.log(id)
    this.user.editUsers(camposLlenados, id).subscribe({
      next: (data) =>{
        window.location.reload()
        console.log(data)
      },
      error: (error) =>{
        console.log(error)
      }
    })
  }

  obtenerCamposRellenados() {
    const formValues = this.loginForm.value;
    const camposRellenados:any = {};

    for (const key in formValues) {
      if (formValues[key]) {
        camposRellenados[key] = formValues[key];
      }
    }

    return camposRellenados
  }

  guardarborrarUser(id: any ) {
    this.userid = id

    return this.userid
  }
  

  borrarUser(idConfirmado:any){
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


  abrirPueba(){
    const element = this.modal.nativeElement
    console.log(element)
    this.render.setStyle(element,"display", "block")
  }

  cerrarPrueba(){
    const element = this.modal.nativeElement
    console.log(element)
    this.render.setStyle(element,"display", "none")
  }


  openModel(){
    const modelDiv = document.getElementById("exampleModal");
    if(modelDiv!= null){
      modelDiv.style.display = "block";
    }
  }

  CloseModel(){
    const modelDiv = document.getElementById("exampleModal");
    if(modelDiv!= null){
      modelDiv.style.display = "none";
    }
  }


  OpenPop(){
    const modelDiv = document.getElementById("PopUp");
    if(modelDiv!= null){
      modelDiv.style.display = "block";
    }
  }

  ClosePop(){
    const modelDiv = document.getElementById("PopUp");
    if(modelDiv!= null){
      modelDiv.style.display = "none";
    }
  }

  borrarCancion(){
    this.lista.eliminarCancion()
  }

}
