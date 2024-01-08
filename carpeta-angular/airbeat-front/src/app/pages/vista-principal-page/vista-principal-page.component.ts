import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaPrincipalComponent } from '../../components/vista-principal/vista-principal.component';
import { HomeComponentComponent } from '../../components/home-component/home-component.component';
@Component({
  selector: 'app-vista-principal-page',
  standalone: true,
  imports: [CommonModule, VistaPrincipalComponent, HomeComponentComponent],
  templateUrl: './vista-principal-page.component.html',
  styleUrl: './vista-principal-page.component.css'
})
export class VistaPrincipalPageComponent {

}
