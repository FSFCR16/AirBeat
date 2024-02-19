import { createAction, props } from "@ngrx/store";
import { PlaylistResponse } from "./playlist.reducer";



export const setPlaylists = createAction(
    "[PLAYLIST] add playlist",
    props <{playlists:PlaylistResponse}>()
)

export const traerPlaylist = createAction(
    "[PLAYLIST] traer playlist",
    props <{playlists:PlaylistResponse[]}>()
)


