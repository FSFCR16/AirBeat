import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BucadorServiciosService } from '../../services/bucador.servicios.service';
import { RouterLink, RouterOutlet, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-nabvar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './nabvar.component.html',
  styleUrl: './nabvar.component.css'
})
export class NabvarComponent implements OnInit {
  datos:any[]=[]
  valorInput: string | undefined;
  idPlaylist: string = ""
  idSong: string=""

  constructor(private buscador: BucadorServiciosService, private router: Router) { }

  ngOnInit(): void {
    this.buscador.traerCanciones().subscribe({
      next: (data:any) => {
        this.datos= data

      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  async irAlaPlaylist(id: string) {
    try {
      await this.router.navigate(['playlist', id]);
      window.location.reload();
    } catch (error) {
      console.error('Error al navegar:', error);
    }
  }


  onInputChange(value: string) {
    this.valorInput = value;
  }

  crearPlaylistBtn(){
    this.buscador.crearPlaylist().subscribe({
      next: async (data:any) => {
        console.log(data); 
        this.idPlaylist = data._id

        try {
          await this.router.navigate(['playlist', this.idPlaylist]);
          window.location.reload();
        } catch (error) {
          console.error('Error al navegar:', error);
        }
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  guardarId(id:string){
    this.idSong = id
  }

  borrarPlaylist(){
    this.buscador.EliminarPlaylist(this.idSong).subscribe({
      next:(data:any)=>{
        window.location.reload()
        console.log(data)
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  openModel() {
    const modelDiv = document.getElementById("modalPlay");
    if (modelDiv != null) {
      modelDiv.style.display = "block";
    }
  }

  CloseModel() {
    const modelDiv = document.getElementById("modalPlay");
    if (modelDiv != null) {
      modelDiv.style.display = "none";
    }
  }
  openModelEliminar() {
    const modelDiv = document.getElementById("modalEliminar");
    if (modelDiv != null) {
      modelDiv.style.display = "block";
    }
  }

  CloseModelEliminar() {
    const modelDiv = document.getElementById("modalEliminar");
    if (modelDiv != null) {
      modelDiv.style.display = "none";
    }
  }

}
