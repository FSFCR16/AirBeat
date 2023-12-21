import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { InputsComponent } from './inputs/inputs.component';
import { usuarioService } from '../../services/vistaperfil.service';
import { User } from '../../services/create-user.service';
import { FormControl, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterOutlet, InputsComponent, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent  {

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
        console.log('edición exitosa:');
        
      },
      error: (error) => {
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
}
