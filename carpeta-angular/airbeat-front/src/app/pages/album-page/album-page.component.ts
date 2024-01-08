import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from '../../components/album/album.component';

@Component({
  selector: 'app-album-page',
  standalone: true,
  imports: [CommonModule, AlbumComponent],
  templateUrl: './album-page.component.html',
  styleUrl: './album-page.component.css'
})
export class AlbumPageComponent {

}
