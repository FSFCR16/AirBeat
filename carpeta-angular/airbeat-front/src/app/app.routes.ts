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
    {path: "search", component: BuscadorPageComponent, canActivate: [guardGuard]},
    {path: "search/historial", component: BuscadorPageComponent, canActivate: [guardGuard]},
    {path: 'search/:cancion', component: BuscadorPageComponent, canActivate: [guardGuard]},
    {path: "playlist/:id", component: PlaylistPageComponent, canActivate: [guardGuard]},
    {path: "admin", component: VistaAdminPageComponent},
    {path: "home", component: VistaPrincipalPageComponent, canActivate: [guardGuard]},
    {path: "user", component: VistaUsuarioPageComponent, canActivate: [guardGuard]},
    {path: "album",component: AlbumComponent, canActivate: [guardGuard]},
    {path: "album",component: AlbumPageComponent, canActivate: [guardGuard]},
    {path:"perfil", component: PerfilComponent, canActivate: [guardGuard]},
    {path: "**", component: VistaPrincipalPageComponent, canActivate: [guardGuard]},
];
