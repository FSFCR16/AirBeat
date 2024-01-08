import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { MusicplayerComponent } from './components/musicplayer/musicplayer.component'
import { NabvarComponent } from './components/nabvar/nabvar.component';
import { BucadorServiciosService } from './services/bucador.servicios.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MusicplayerComponent, NabvarComponent ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'airbeat-front';
  isFocused: boolean = false;
  mostrarComponente:any= true;


  constructor(private router:Router, private buscador: BucadorServiciosService){
    this.buscador.verificarRuta().subscribe(valor => {
      this.mostrarComponente = valor;
    });
  }

  changeColorInput(status: boolean) {
    this.isFocused = status;

  }
  
}
// TIPOS DE EVENTOS PARA INSTANCIAR EN UNA RUTA
// NavigationStart: Se emite cuando se inicia la navegación a una nueva URL.
// RouteConfigLoadStart: Se emite antes de cargar la configuración de una ruta.
// RouteConfigLoadEnd: Se emite después de cargar la configuración de una ruta.
// RoutesRecognized: Se emite cuando se han reconocido las rutas.
// GuardsCheckStart: Se emite al inicio de la verificación de los guards de las rutas.
// ChildActivationStart: Se emite cuando se inicia la activación de un componente secundario.
// ActivationStart: Se emite cuando se inicia la activación de una ruta.
// ResolveStart: Se emite al iniciar la resolución de datos en una ruta.
// ResolveEnd: Se emite al finalizar la resolución de datos en una ruta.
// ActivationEnd: Se emite cuando finaliza la activación de una ruta.
