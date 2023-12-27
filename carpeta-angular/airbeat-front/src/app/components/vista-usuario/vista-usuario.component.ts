import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-vista-usuario',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './vista-usuario.component.html',
  styleUrl: './vista-usuario.component.css'
})
export class VistaUsuarioComponent {

}
