import { Component,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BucadorServiciosService, songs } from '../../services/bucador.servicios.service';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent implements OnInit {
  tracks:songs[]=[]
  imgAlb:string=""
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
      error:(error)=>{
        console.log(error)
      }
    })
  }
}
