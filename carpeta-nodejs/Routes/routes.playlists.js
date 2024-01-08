import express from "express"
import { createPlaylist,changeName, postPlaylist, deletePlaylist, deleteSongPlaylist, traerPlaylistsId, traerPlaylistById} from "../drivers/drivers.playlist.js"
import { authVerification } from "../middleware/autenticacion.middlewere.js"
import { verificarName } from "../middleware/playlist.middlewere.js"


const routerTres= express.Router()

routerTres.post("/createPlylist",authVerification,createPlaylist)
routerTres.get("/getPlaylist", authVerification, traerPlaylistsId )
routerTres.get("/getPlaylistById/:_id", authVerification, traerPlaylistById )
routerTres.put("/updatePlaylist/:_id/:_idsong", authVerification, postPlaylist)
routerTres.delete("/deletePlaylist/:_id", authVerification, deletePlaylist )
routerTres.delete("/deleteSongPalylist/:_id/:_idsong", authVerification, deleteSongPlaylist)
routerTres.put("/changeName/:_id", authVerification, changeName)

export default routerTres 