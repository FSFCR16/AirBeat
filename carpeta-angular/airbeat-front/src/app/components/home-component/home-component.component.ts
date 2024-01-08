import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationStart, RouterOutlet, } from '@angular/router';
import { MusicplayerComponent } from './../musicplayer/musicplayer.component';
import { NabvarComponent } from './../nabvar/nabvar.component';
import { BuscadorPageComponent } from '../../pages/buscador-page/buscador-page.component';
import { AlbumComponent } from './../album/album.component';
@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule,MusicplayerComponent,RouterOutlet,NabvarComponent,AlbumComponent],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

}
