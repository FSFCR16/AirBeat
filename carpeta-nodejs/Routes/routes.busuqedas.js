import express  from "express";
import { historial, getHistorial } from "../drivers/drivers.busqueda.js";
import { authVerification } from "../middleware/autenticacion.middlewere.js";
import { verifyUser } from "../middleware/busqueda.middlewere.js";
const routerCuatro= express.Router()

routerCuatro.post('/postSong/:_id', authVerification , verifyUser,historial)
routerCuatro.get('/traerCanciones', authVerification, getHistorial )
export default routerCuatro 