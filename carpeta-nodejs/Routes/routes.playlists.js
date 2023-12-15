import express from "express"
import { createPlaylist, postPlaylist, deletePlaylist, deleteSongPlaylist} from "../drivers/drivers.playlist.js"
import { authVerification } from "../middleware/autenticacion.middlewere.js"

const routerTres= express.Router()

routerTres.post("/createPlylist",authVerification,createPlaylist)
routerTres.put("/updatePlaylist", authVerification, postPlaylist)
routerTres.delete("/deletePlaylist/:_id", authVerification, deletePlaylist )
routerTres.get("/deleteSongPalylist/:_id", authVerification, deleteSongPlaylist)

export default routerTres 