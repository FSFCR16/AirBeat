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
router.post('/postsongs', songIn, SongsPost);//listo 
router.get('/getsongsmassive', SongsGet);//listo
router.get('/getsongsforname', findSongByName);//listo
router.get('/getalbum', findSongsByAlbum); //listo
router.get('/getsongs/:name', findSongsByArtist); 
router.get('/search/:general', findgeneral);
router.get('/Songsexplicit/:explicit', findSongsByExplicit);
router.delete('/deletesongsforname', SongsDeletename);
router.delete('/deletesongsforid', SongsDelete);
//editar



export default router;