import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import{NavviewbetaComponent} from '../../components/navviewbeta/navviewbeta.component';
import{ MainbetaComponent } from '../../components/mainbeta/mainbeta.component';
import { AlbumComponent } from '../../components/album/album.component';

@Component({
  selector: 'app-viewbeta',
  standalone: true,
  imports: [CommonModule, NavviewbetaComponent, MainbetaComponent,AlbumComponent],
  templateUrl: './viewbeta.component.html',
  styleUrl: './viewbeta.component.css'
})
export class ViewbetaComponent {

}
