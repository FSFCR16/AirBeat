import express from "express"
import { createPlaylist, postPlaylist, deletePlaylist, deleteSongPlaylist, traerPlaylistId} from "../drivers/drivers.playlist.js"
import { authVerification } from "../middleware/autenticacion.middlewere.js"

const routerTres= express.Router()

routerTres.post("/createPlylist",authVerification,createPlaylist)
routerTres.get("/getPlaylist", authVerification, traerPlaylistId )
routerTres.put("/updatePlaylist", authVerification, postPlaylist)
routerTres.delete("/deletePlaylist/:_id", authVerification, deletePlaylist )
routerTres.get("/deleteSongPalylist/:_id", authVerification, deleteSongPlaylist)

export default routerTres 