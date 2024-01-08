import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mainbeta',
  standalone: true,
  imports: [CommonModule,RouterOutlet, RouterModule],

  templateUrl: './mainbeta.component.html',
  styleUrl: './mainbeta.component.css'
})
export class MainbetaComponent {
routeParameterValue: any;

}
