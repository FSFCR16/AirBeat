import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { BuscadorPageComponent } from './pages/buscador-page/buscador-page.component';
import { PlaylistPageComponent } from './pages/playlist-page/playlist-page.component';
import { VistaAdminPageComponent } from './pages/vista-admin-page/vista-admin-page.component';
import { VistaPrincipalPageComponent } from './pages/vista-principal-page/vista-principal-page.component';
import { VistaUsuarioPageComponent } from './pages/vista-usuario-page/vista-usuario-page.component';
export const routes: Routes = [
    {path: "login-page", component: LoginPageComponent},
    {path: "search", component: BuscadorPageComponent},
    {path: "playlist", component: PlaylistPageComponent},
    {path: "admin", component: VistaAdminPageComponent},
    {path: "home", component: VistaPrincipalPageComponent},
    {path: "user", component: VistaUsuarioPageComponent},
    {path: "**", component: VistaPrincipalPageComponent},

];
