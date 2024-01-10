import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { InputsComponent } from './inputs/inputs.component';
import { usuarioService } from '../../services/vistaperfil.service';
import { User } from '../../services/create-user.service';
import { FormControl, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorComponent } from '../error/error.component';
import { response } from 'express';
import { delay } from 'rxjs';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterOutlet, InputsComponent, ReactiveFormsModule, ErrorComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  usuario: any = {};
  alert: boolean = false;
  alerterror: boolean = false;
  alertgeneral: boolean = false;

  @ViewChild("infoRegistro") infoRegistro!: ElementRef

  updateForm: FormGroup;
  formularioDesactivado = true;

  constructor(private usuarioService: usuarioService, private router: Router, private form: FormBuilder) {
    this.updateForm = this.form.group({
      name: [{ value: '', disabled: this.formularioDesactivado }],
      lastname: [{ value: '', disabled: this.formularioDesactivado }],
      telefono: [{ value: '', disabled: this.formularioDesactivado }],
      email: [{ value: '', disabled: this.formularioDesactivado }],
      password: [{ value: '', disabled: this.formularioDesactivado }],
    });
  }
  ngOnInit(): void {
    this.obtenerUsuario();
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

  
  editarUsuario() {
    this.formularioDesactivado = !this.formularioDesactivado;
    if (this.formularioDesactivado) {
      this.updateForm.disable();
    } else {
      this.updateForm.enable();
    }
  }
  async editarusuario() {
    const camposLlenos = this.obtenerCamposLlenos(this.updateForm.value);
    const respuesta = await this.usuarioService.editUser(camposLlenos).subscribe({
      next: (user) => {
        console.log(user);
        this.alert = true;
        window.location.reload();
        setTimeout(()=>{this.alert = false;},1900);
      },
      error: (error) => {
        this.alerterror = true;
        setTimeout(()=>{this.alerterror = false;},1900);
        console.error('Error al editar usuario:', error);
      }
    });
  }

  obtenerCamposLlenos(datosFormulario: any): any {
    const camposLlenos: any = {};
    for (const key in datosFormulario) {
      if (datosFormulario[key]) {
        camposLlenos[key] = datosFormulario[key];
      }
    }
    return camposLlenos;
  }

  recargarPagina() {
   
    // location.reload(); es para volcer al inicio de la pagina
    window.location.reload();
  }

}
