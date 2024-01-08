import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaAdminComponent } from '../../components/vista-admin/vista-admin.component';
@Component({
  selector: 'app-vista-admin-page',
  standalone: true,
  imports: [CommonModule, VistaAdminComponent],
  templateUrl: './vista-admin-page.component.html',
  styleUrl: './vista-admin-page.component.css'
})
export class VistaAdminPageComponent {

}
