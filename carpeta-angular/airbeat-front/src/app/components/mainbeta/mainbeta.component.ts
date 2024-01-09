import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BucadorServiciosService, songs } from '../../services/bucador.servicios.service';



@Component({
  selector: 'app-mainbeta',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],

  templateUrl: './mainbeta.component.html',
  styleUrl: './mainbeta.component.css'
})
export class MainbetaComponent {
  routeParameterValue: any;
  cancionesPredeterminadas: songs[] = []
  constructor(private buscador: BucadorServiciosService) { }

  ngOnInit() {
    this.buscador.traerCancionAleatorias().subscribe({
      next: (data: any) => {
        this.cancionesPredeterminadas = data
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}

