import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationStart, RouterOutlet, } from '@angular/router';
import { MusicplayerComponent } from './../musicplayer/musicplayer.component';
import { NabvarComponent } from './../nabvar/nabvar.component';
@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule,MusicplayerComponent,RouterOutlet,NabvarComponent],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

}
