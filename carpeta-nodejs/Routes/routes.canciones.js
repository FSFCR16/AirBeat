import express from 'express'; // se llama express que es un framework de node para crear servidores web
import {
    SongsPost,
    SongsGet,
    SongsDelete,
    findSongByName,
    findSongsByAlbum,
    SongsDeletename
} from '../drivers/drivers.canciones.js'; // se llama el archivo de controlador y se importan las funciones

import {
    songIn
} from '../middleware/cancionExiste.middelwere.js';

const router = express.Router();
router.post('/postsongs', songIn, SongsPost);
router.get('/getsongsmassive', SongsGet);
router.get('/getsongsforname', findSongByName);
router.get('/getlbum/:name_album', findSongsByAlbum); // no funciona
router.delete('/deletesongsforname', SongsDeletename);
router.delete('/deletesongsforid', SongsDelete);
//filtro de explicit,busqueda por artista,genero

export default router;