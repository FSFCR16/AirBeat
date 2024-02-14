import { songs } from "./services/bucador.servicios.service";

export interface AppState {
    readonly songslist: songs[]
}