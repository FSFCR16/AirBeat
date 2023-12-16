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
    findgeneral,
    editSongById,
    findSongByID
} from '../drivers/drivers.canciones.js'; // se llama el archivo de controlador y se importan las funciones

import {
    songIn
} from '../middleware/cancionExiste.middelwere.js';

const router = express.Router();
//rutas para usuarios 
router.get('/search/track/:name_track', findSongByName);
router.get('/search/id/:_id', findSongByID);
router.get('/search/album/:name_album', findSongsByAlbum); 
router.get('/search/artist/:name', findSongsByArtist); 
router.get('/search/:general', findgeneral);
router.get('/explicit/:explicit', findSongsByExplicit);
router.get('/all', SongsGet);
//rutas para admin
router.delete('/delete/name/:name_track', SongsDeletename);
router.delete('/delete/id/:_id', SongsDelete); 
router.put('/songs/edit:_id', editSongById);
router.post('/postsongs', songIn, SongsPost);


export default router;