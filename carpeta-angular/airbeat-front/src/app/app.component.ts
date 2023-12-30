import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { MusicplayerComponent } from './components/musicplayer/musicplayer.component'
import { NabvarComponent } from './components/nabvar/nabvar.component';
import { AlbumComponent } from './components/album/album.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MusicplayerComponent, NabvarComponent, AlbumComponent ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'airbeat-front';
  mostrarComponente:boolean= true;
  constructor(private router:Router){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log(event.url)
        if (event.url === '/login-page') {
          console.log(this.mostrarComponente)
          this.mostrarComponente = false; // No mostrar el componente en esta ruta
        } else {
          this.mostrarComponente = true; // Mostrar el componente en otras rutas
        }
      }
    });
  }

  ngOnInit(): void {
    console.log(this.router.url)
  }
}
