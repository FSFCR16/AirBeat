import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../components/componente_l/login/login.component';
import { RegistroComponent } from '../../components/componente_l/registro/registro.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegistroComponent, RouterOutlet],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
}
