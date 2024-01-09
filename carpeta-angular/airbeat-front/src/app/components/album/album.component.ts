import { Component,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BucadorServiciosService, songs } from '../../services/bucador.servicios.service';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule,ErrorComponent],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent implements OnInit {
  tracks:songs[]=[]
  imgAlb:string=""
  alerta:boolean=false
  constructor(private album:BucadorServiciosService){

  }
  
  ngOnInit(): void {
    const nomAlbum="Manzanas a la Vuelta"
    this.album.getAlbum(nomAlbum).subscribe({
      next:(data)=>{
        this.tracks=data
        this.imgAlb=data[0].img_urls.img_url_300
        console.log(this.tracks)
      },
      error: (error) => {
        if (error.status === 404) {
          this.alerta = true;
          console.error('Usuario no encontrado 404:', error);
        } else if (error.status === 500) {
          this.alerta = true;
          console.error('Error del servidor 500:', error);
        } else {
          this.alerta = true;
          console.error('Error al obtener usuario:', error);
        }
      }
    })
  }
}
