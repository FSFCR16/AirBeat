import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CreateUserService } from '../../services/create-user.service';
import { User } from '../../services/create-user.service';

@Component({
  selector: 'app-vista-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './vista-admin.component.html',
  styleUrl: './vista-admin.component.css'
})
export class VistaAdminComponent implements OnInit {

  listaUsuarios: User[] = []

  userid: any = ""

  constructor(private user: CreateUserService) {

  }
  ngOnInit(): void {
    this.user.traerUsuarios().subscribe({
      next: (data) => {
        this.listaUsuarios = data
        console.log(this.listaUsuarios)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  guardarborrarUser(id: any ) {
    this.userid = id
    console.log(this.userid)
  }

  borrarUser(idConfirmado:any){
    this.user.borrarUsuario(idConfirmado).subscribe({
      next: (data) => {
        window.location.reload()
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  openModel(){
    const modelDiv = document.getElementById("exampleModal");
    if(modelDiv!= null){
      modelDiv.style.display = "block";
    }
  }

  CloseModel(){
    const modelDiv = document.getElementById("exampleModal");
    if(modelDiv!= null){
      modelDiv.style.display = "none";
    }
  }
}
