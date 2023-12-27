import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationStart } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class HiddenService {

  public ocultarComponentes = true

  constructor(private router: Router) { }

  ocultarElementos(){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log(event)
        const rutaActual = event.url;
        this.ocultarComponentes = !(rutaActual === '/login-page' || rutaActual === '/admin') ;
        
      }
    });
  } 
}
