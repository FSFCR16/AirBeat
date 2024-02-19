import { createReducer, on } from "@ngrx/store";
import { setPlaylists } from "./playlist.action";
import { songs } from "../services/bucador.servicios.service";
import { traerPlaylist } from "./playlist.action";

export interface PlaylistResponse {
    namePlaylist: string,
    userId?: string,
    songs: songs[],
    _id?: any
}

const initState: PlaylistResponse[] = [];


const play_list = "playlists"
const localStorageInfo = localStorage.getItem(play_list)
//const initState: PlaylistResponse[]= localStorageInfo ? JSON.parse(localStorageInfo) : []
/*export const playlisReducer = createReducer(
    initState,
    on(setPlaylists, (oldState, { playlists }) => {
        const newState = [...oldState, playlists]
        localStorage.setItem(play_list, JSON.stringify(newState))
        return newState
    })
) */

export const getPlaylistReducer = createReducer(
    initState,
    on(traerPlaylist, (_oldState, { playlists }) => {
        const newState = [..._oldState, ...playlists]
        console.log(newState)
        return newState
    }),

    on(setPlaylists, (_oldState, { playlists }) => {
        console.log(_oldState)
        const newState = [..._oldState, playlists]
        return newState
    }),
)

