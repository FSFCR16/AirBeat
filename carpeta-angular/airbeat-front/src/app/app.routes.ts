import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { BuscadorPageComponent } from './pages/buscador-page/buscador-page.component';
import { PlaylistPageComponent } from './pages/playlist-page/playlist-page.component';
import { VistaAdminPageComponent } from './pages/vista-admin-page/vista-admin-page.component';
import { VistaPrincipalPageComponent } from './pages/vista-principal-page/vista-principal-page.component';
import { VistaUsuarioPageComponent } from './pages/vista-usuario-page/vista-usuario-page.component';
import { AlbumPageComponent } from './pages/album-page/album-page.component';
import { AlbumComponent } from './components/album/album.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ViewbetaComponent } from './pages/viewbeta/viewbeta.component';



export const routes: Routes = [
    { path: "Init", component: ViewbetaComponent },//pau
    { path: "login-page", component: LoginPageComponent },//listo falta el validador del registro
    { path: "search", component: BuscadorPageComponent },//santi no
    { path: "search/historial", component: BuscadorPageComponent },//no funciona
    { path: 'search/:cancion', component: BuscadorPageComponent },//santi no
    { path: "playlist/:id", component: PlaylistPageComponent },//no funciona
    { path: "admin", component: VistaAdminPageComponent },// lsito
    { path: "home", component: VistaPrincipalPageComponent },//pau
    { path: "user", component: VistaUsuarioPageComponent },//no funciona
    { path: "album", component: AlbumComponent },// listo
    // {path: "album",component: AlbumPageComponent},//no funciona
    { path: "perfil", component: PerfilComponent },//listo 
    { path: "**", component: VistaPrincipalPageComponent },
];
