import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent {
  albumImg = "https://i.scdn.co/image/ab67616d0000b27328f61734580994bdf0819891"
  tracks=[
    {
      name:"Whatever",
      artist:"Test Artist",
    },{
      name:"Chasing The Drum",
      artist:"Yussef Dayes",
    },{
      name:"Whatever",
      artist:"Test Artist",
    }
  ]
}
