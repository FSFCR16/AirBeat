import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from '../registro/registro.component';
import { FormControl,ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CreateUserService } from '../../services/create-user.service';
import { Router } from '@angular/router';
<<<<<<< HEAD
=======
import { Console, error } from 'console';
>>>>>>> c34de5990250f4c6ee06a7031fb64d46677af333
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RegistroComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild("btniniciar") btnIniciar!: ElementRef
  @ViewChild("btnregistrar") btnRegistrar!: ElementRef
  @ViewChild(RegistroComponent) login!:  RegistroComponent
  @ViewChild("infoInicio") infoInicio!: ElementRef

  loginForm:any;



  constructor(private render:Renderer2, private userService:CreateUserService,private router:Router){
    this.loginForm= new FormGroup({email:new FormControl(),password: new FormControl()})
  }
  onSubmit(){
    const email = this.loginForm.value.email;

    const password = this.loginForm.value.password;
<<<<<<< HEAD
=======

>>>>>>> c34de5990250f4c6ee06a7031fb64d46677af333
    if(!this.loginForm.valid){
      return;
    }
    this.userService.inicarSesion(email, password).subscribe({
<<<<<<< HEAD
      next: (token)=>{
        this.userService.saveToken(token)
        this.router.navigate(["/home"])
        console.log(token)
      },
      error: (error)=>{
        console.log(error)}
    })
=======
      next: (token) => {
        if (token) {
          this.userService.saveToken(token);
          this.router.navigate(['/home']);
          console.log(token)
        }

      },
      error:(error) => {
        console.log(error)
        console.log('Ocurrió un error:', error.error.error);
        if (error.error.error === 'credenciales incorrectas') {
          alert('Credenciales incorrectas. Verifique nuevamente.');
          this.router.navigate(['/login-page']);
        } else if (error.error.error=== 'No existe un usuario con este Email') {
          alert('No existe un usuario con este Email.');
          this.router.navigate(['/login-page']);
        } else {
          console.log('Error desconocido:', error);
          // Si hay un error desconocido, decide si redirigir o realizar alguna otra acción
        }
      }
  });
>>>>>>> c34de5990250f4c6ee06a7031fb64d46677af333
  }
  ngAfterViewInit(){
    this.render.addClass(this.btnIniciar.nativeElement, "colorMorado")
    this.render.removeClass(this.btnRegistrar.nativeElement, "colorMorado")
  }

  inicioColor(){
    this.ngAfterViewInit()
    this.login.infoR().nativeElement.setAttribute("hidden",true)
    this.infoInicio.nativeElement.removeAttribute("hidden")
  }

  registroColor(){
    this.render.addClass(this.btnRegistrar.nativeElement, "colorMorado")
    this.render.removeClass(this.btnIniciar.nativeElement, "colorMorado")
    this.login.infoR().nativeElement.removeAttribute("hidden")
    this.infoInicio.nativeElement.setAttribute("hidden",true)
  }
}