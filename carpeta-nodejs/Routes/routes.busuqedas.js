import express  from "express";
import { historial } from "../drivers/drivers.busqueda.js";
import { authVerification } from "../middleware/autenticacion.middlewere.js";

const routerCuatro= express.Router()

routerCuatro.post("/postSong/:_id", authVerification, historial)

export default routerCuatro 