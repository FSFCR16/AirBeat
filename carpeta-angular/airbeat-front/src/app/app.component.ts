import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MusicplayerComponent } from './components/musicplayer/musicplayer.component'
import { NabvarComponent } from './components/nabvar/nabvar.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MusicplayerComponent, NabvarComponent ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'airbeat-front';
}
