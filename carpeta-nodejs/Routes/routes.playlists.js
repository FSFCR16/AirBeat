import express from "express"
import { createPlaylist,changeName, postPlaylist, deletePlaylist, deleteSongPlaylist, traerPlaylistId} from "../drivers/drivers.playlist.js"
import { authVerification } from "../middleware/autenticacion.middlewere.js"
import { verificarName } from "../middleware/playlist.middlewere.js"


const routerTres= express.Router()

routerTres.post("/createPlylist",authVerification,verificarName,createPlaylist)
routerTres.get("/getPlaylist", authVerification, traerPlaylistId )
routerTres.put("/updatePlaylist/:_id", authVerification, postPlaylist)
routerTres.delete("/deletePlaylist/:_id", authVerification, deletePlaylist )
routerTres.get("/deleteSongPalylist/:_id", authVerification, deleteSongPlaylist)
routerTres.put("/changeName/:_id", authVerification, changeName)

export default routerTres 