import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BucadorServiciosService } from '../../services/bucador.servicios.service';
@Component({
  selector: 'app-nabvar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nabvar.component.html',
  styleUrl: './nabvar.component.css'
})
export class NabvarComponent implements OnInit {
  datos:any[]=[]
  valorInput: string | undefined;
  constructor(private buscador: BucadorServiciosService) { }

  ngOnInit(): void {
    this.buscador.traerCanciones().subscribe({
      next: (data:any) => {
        for(let i =0; i< data.length; i++){
          this.datos.push(data[i]) 
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
    console.log(this.valorInput)
  }

  onInputChange(value: string) {
    this.valorInput = value;
  }
}
