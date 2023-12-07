import express from 'express';// se llama express que es un framework de node para crear servidores web
import { SongsPost, SongsGet } from '../drivers/drivers.js';// se llama el archivo de controlador y se importan las funciones

const router = express.Router();
router.post('/songs', SongsPost);
router.get('/getsongs', SongsGet);

export default router;