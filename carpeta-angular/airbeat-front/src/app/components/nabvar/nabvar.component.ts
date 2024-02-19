import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BucadorServiciosService } from '../../services/bucador.servicios.service';
import { RouterLink, RouterOutlet, RouterLinkActive, Router } from '@angular/router';
import { PlaylistResponse } from '../../Store/playlist.reducer';
import { Store, select } from '@ngrx/store';
import { setPlaylists, traerPlaylist } from '../../Store/playlist.action';
import { AppState } from '../../app.state';


@Component({
  selector: 'app-nabvar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './nabvar.component.html',
  styleUrl: './nabvar.component.css'
})
export class NabvarComponent implements OnInit {
  datos:PlaylistResponse[] = []
  valorInput:string | undefined;
  idPlaylist:string = ""
  idSong:string= ""

  playlist: PlaylistResponse = {
    namePlaylist: "mi primera playlist",
    songs: []
  }


  constructor(
    private buscador: BucadorServiciosService, 
    private router: Router, 
    private store:Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store.pipe(select("playlists")).subscribe((playlistState: PlaylistResponse[]) => {
      console.log(playlistState)
      this.datos = playlistState
      console.log(this.datos)
    })

    this.buscador.traerCanciones().subscribe({
      next: (data:PlaylistResponse[]) => {
        this.store.dispatch(traerPlaylist({playlists:data}))
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  async irAlaPlaylist(id: string) {
    try {
      await this.router.navigate(['playlist', id]);
      window.location.reload();
    } catch (error) {
      console.error('Error al navegar:', error);
    }
  }


  onInputChange(value: string) {
    this.valorInput = value;
  }

  crearPlaylistBtn(){
    this.buscador.crearPlaylist().subscribe({
      next: (playlists:PlaylistResponse) => {
        this.store.dispatch(setPlaylists({playlists:playlists}))
        this.idPlaylist = playlists._id
        
        /*try {
          await this.router.navigate(['playlist', this.idPlaylist]);
          window.location.reload();
        } catch (error) {
          console.error('Error al navegar:', error);
        }*/
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  guardarId(id:string){
    this.idSong = id
  }

  borrarPlaylist(){
    this.buscador.EliminarPlaylist(this.idSong).subscribe({
      next:(data:any)=>{
        window.location.reload()
        console.log(data)
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  openModel() {
    const modelDiv = document.getElementById("modalPlay");
    if (modelDiv != null) {
      modelDiv.style.display = "block";
    }
  }

  CloseModel() {
    const modelDiv = document.getElementById("modalPlay");
    if (modelDiv != null) {
      modelDiv.style.display = "none";
    }
  }
  openModelEliminar() {
    const modelDiv = document.getElementById("modalEliminar");
    if (modelDiv != null) {
      modelDiv.style.display = "block";
    }
  }

  CloseModelEliminar() {
    const modelDiv = document.getElementById("modalEliminar");
    if (modelDiv != null) {
      modelDiv.style.display = "none";
    }
  }
  handleButtonClick(event: Event) {
    event.stopPropagation(); 
    console.log('Clic en el botón');
  
  }


  agregarPlaylist(playlists:PlaylistResponse){
    this.store.dispatch(setPlaylists({playlists:playlists}))
  }
}
