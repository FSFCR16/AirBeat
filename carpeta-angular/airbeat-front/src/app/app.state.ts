import { PlaylistResponse } from "./Store/playlist.reducer";

export interface AppState {
    readonly playlists: PlaylistResponse[]
}

