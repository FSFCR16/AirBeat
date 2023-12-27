import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorComponent } from '../../components/buscador/buscador.component';
@Component({
  selector: 'app-buscador-page',
  standalone: true,
  imports: [CommonModule, BuscadorComponent],
  templateUrl: './buscador-page.component.html',
  styleUrl: './buscador-page.component.css'
})
export class BuscadorPageComponent {

}
