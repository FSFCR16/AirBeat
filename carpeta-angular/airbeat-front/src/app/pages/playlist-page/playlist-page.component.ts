import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistComponent } from '../../components/playlist/playlist.component';
@Component({
  selector: 'app-playlist-page',
  standalone: true,
  imports: [CommonModule, PlaylistComponent],
  templateUrl: './playlist-page.component.html',
  styleUrl: './playlist-page.component.css'
})
export class PlaylistPageComponent {

}
