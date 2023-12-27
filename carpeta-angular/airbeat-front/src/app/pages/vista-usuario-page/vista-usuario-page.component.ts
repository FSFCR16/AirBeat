import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaUsuarioComponent } from '../../components/vista-usuario/vista-usuario.component';
@Component({
  selector: 'app-vista-usuario-page',
  standalone: true,
  imports: [CommonModule, VistaUsuarioComponent],
  templateUrl: './vista-usuario-page.component.html',
  styleUrl: './vista-usuario-page.component.css'
})
export class VistaUsuarioPageComponent {

}
