import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from '../registro/registro.component';
import { FormControl,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CreateUserService } from '../../services/create-user.service';
import { Router } from '@angular/router';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RegistroComponent, ReactiveFormsModule,ErrorComponent, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  alertgeneral: boolean = false;
  @ViewChild("btniniciar") btnIniciar!: ElementRef
  @ViewChild("btnregistrar") btnRegistrar!: ElementRef
  @ViewChild(RegistroComponent) login!:  RegistroComponent
  @ViewChild("infoInicio") infoInicio!: ElementRef

  loginForm:any;
  // constructor(private render:Renderer2, private userService:CreateUserService,private router:Router){
  //   this.loginForm= new FormGroup({email:new FormControl(),password: new FormControl()})
  // }

  constructor(private render: Renderer2, private userService: CreateUserService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }
  onSubmit(){
    const email = this.loginForm.value.email;

    const password = this.loginForm.value.password;
    if(!this.loginForm.valid){
      return;
    }
    this.userService.inicarSesion(email, password).subscribe({
      next: (token) => {
        if (token) {
          this.userService.saveToken(token);
          this.router.navigate(['/home']);
        }

      },
      error:(error) => {
        console.log('Ocurrió un error:', error.error.error);
        if (error.error.error === 'credenciales incorrectas') {
          alert('Credenciales incorrectas. Verifique nuevamente.');
          this.router.navigate(['/login-page']);
        } else if (error.error.error=== 'No existe un usuario con este Email') {
          alert('No existe un usuario con este Email.');
          this.router.navigate(['/login-page']);
        } else {
          console.log('Error desconocido:', error);
          this.alertgeneral = true;
        }
      }
  });
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

  recargarPagina() {
   
    // location.reload(); es para volcer al inicio de la pagina
    window.location.reload();
  }
}