import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from '../../components/perfil/perfil.component';

@Component({
  selector: 'app-vistaperfil',
  standalone: true,
  imports: [CommonModule, PerfilComponent],
  templateUrl: './vistaperfil.component.html',
  styleUrl: './vistaperfil.component.css'
})
export class VistaperfilComponent {

}
