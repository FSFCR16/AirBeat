import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  recargarPagina() {
   
    // location.reload(); es para volcer al inicio de la pagina
    window.location.reload();
  }
}
