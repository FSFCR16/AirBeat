import express from 'express'; // se llama express que es un framework de node para crear servidores web
import {
    SongsPost,
    SongsGet,
    SongsDelete,
    findSongByName,
    findSongsByAlbum,
    SongsDeletename,
    findSongsByExplicit,
    findSongsByArtist,
    findgeneral
} from '../drivers/drivers.canciones.js'; // se llama el archivo de controlador y se importan las funciones

import {
    songIn
} from '../middleware/cancionExiste.middelwere.js';

const router = express.Router();
router.post('/postsongs', songIn, SongsPost);
router.get('/getsongsmassive', SongsGet);
router.get('/getsongsforname', findSongByName);
router.get('/getlbum/:name_album', findSongsByAlbum); 
router.get('/getsongs/:name', findSongsByArtist); 
router.get('/search/:general', findgeneral);
router.get('/Songsexplicit/:explicit', findSongsByExplicit);
router.delete('/deletesongsforname', SongsDeletename);
router.delete('/deletesongsforid', SongsDelete);


export default router;