import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsComponent } from './inputs/inputs.component';
import { CreateUserService } from '../../services/create-user.service';
import { User } from '../../services/create-user.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorComponent } from '../error/error.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, InputsComponent, FormsModule, ErrorComponent,ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {


  @ViewChild("infoRegistro") infoRegistro!: ElementRef
  alertgeneral: boolean = false;
  usuario: User = {
    email: "",
    name: "",
    lastname: "",
    telefono: "",
    password: "",
    confirmPass: "",
  }

  registroForm: FormGroup; // Define el formulario

  constructor(
    private fb: FormBuilder,
    private usuarioService: CreateUserService,
    private router: Router
  ) {
    // Inicializa el formulario con validadores
    this.registroForm = this.fb.group({
      name: ['', Validators.required as any],
      lastname: [''],
      telefono: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPass: ['']
    });
  }

  async usuarioCrear() {
    const respuesta = await this.usuarioService.crearUsuario(this.usuario).subscribe({
      next: (token) => {
        console.log('Usuario creado exitosamente:', this.usuario);
        // Puedes realizar acciones adicionales después de crear el usuario
        this.usuarioService.saveToken(token)
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error al crear usuario:', error);
        this.alertgeneral = true;
      }
    }

    );
  }

  infoR(): ElementRef {
    return this.infoRegistro
  }

  recargarPagina() {
   
    // location.reload(); es para volcer al inicio de la pagina
    window.location.reload();
  }
}
