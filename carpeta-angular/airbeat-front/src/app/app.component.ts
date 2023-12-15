import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { NavigationStart } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HiddenService } from './services/hidden.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HomeComponentComponent, RouterOutlet, LoginPageComponent ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'airbeat-front';

  constructor(public servicio: HiddenService, private router:Router){
    
  }
  ngOnInit(): void {
    this.servicio.ocultarElementos()
  }
}

