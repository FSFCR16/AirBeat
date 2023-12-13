import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsComponent } from './inputs/inputs.component';
import { CreateUserService } from '../../services/create-user.service';
import { User } from '../../services/create-user.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, InputsComponent, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  @ViewChild("infoRegistro") infoRegistro!: ElementRef

  usuario: User = {
    email: "",
    name: "",
    lastname: "",
    telefono: "",
    password: "",
    confirmPass: "",
  }

  constructor(private usuarioService:CreateUserService){}

  async usuarioCrear(){
    const respuesta= await this.usuarioService.crearUsuario(this.usuario).subscribe(
      response => {
        console.log('Usuario creado exitosamente:', response);
        // Puedes realizar acciones adicionales después de crear el usuario
      },
      error => {
        console.error('Error al crear usuario:', error);
        // Maneja errores según tus necesidades
      }
    );
  }

  infoR(): ElementRef {
    return this.infoRegistro
  }
}
