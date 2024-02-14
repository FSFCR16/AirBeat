import { createAction, props } from "@ngrx/store";
import { songs } from "../services/bucador.servicios.service";

export const addSong = createAction(
    "[PLAYLIST] add songs",
    props <{song:songs}>()
)