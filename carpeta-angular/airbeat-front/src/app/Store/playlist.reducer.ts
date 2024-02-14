import { createReducer, on } from "@ngrx/store";
import { songs } from "../services/bucador.servicios.service";
import { addSong } from "./playlist.action";

const song_list_name = "songList"
const localStorageInfo = localStorage.getItem(song_list_name)
const initState: any = localStorageInfo ? JSON.parse(localStorageInfo):  []
//console.log(intiState)
//const inicio: songs[] = [intiState.songs] 
export const songsReducer = createReducer(
    initState,
    on(addSong, (oldState, { song }) => {
        console.log(oldState)
        const newState = [...oldState,song]
        console.log(newState)
        localStorage.setItem(song_list_name, JSON.stringify(newState))
        return newState
})
)