import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../components/login/login.component';
import { RegistroComponent } from '../../components/registro/registro.component';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegistroComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
