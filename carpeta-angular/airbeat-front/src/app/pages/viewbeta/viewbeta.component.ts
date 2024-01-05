import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import{NavviewbetaComponent} from '../../components/navviewbeta/navviewbeta.component';


@Component({
  selector: 'app-viewbeta',
  standalone: true,
  imports: [CommonModule, NavviewbetaComponent],
  templateUrl: './viewbeta.component.html',
  styleUrl: './viewbeta.component.css'
})
export class ViewbetaComponent {

}
