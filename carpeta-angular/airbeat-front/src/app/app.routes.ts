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
import { guardAdmin, guardGuard } from './guards/guard.guard';



export const routes: Routes = [
    {path: "Init", component: ViewbetaComponent},
    {path: "login-page", component: LoginPageComponent},
    {path: "search", component: BuscadorPageComponent, children:[
        {path: "historial", component: BuscadorPageComponent},
        {path: ':cancion', component: BuscadorPageComponent},
    ]},
    {path: "playlist/:id", component: PlaylistPageComponent},
    {path: "admin", component: VistaAdminPageComponent},
    {path: "home", component: VistaPrincipalPageComponent},
    {path: "album/:name",component: AlbumPageComponent},
    {path:"perfil", component: PerfilComponent},
    {path: "**", component: VistaPrincipalPageComponent},

];
