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
router.post('/postsongs', songIn, SongsPost);//listo 
router.get('/getsongsmassive', SongsGet);//listo
router.get('/getsongsforname', findSongByName);//listo
router.get('/getsongsforID/:_id', findSongByID);//listo
router.get('/getalbum', findSongsByAlbum); //listo
router.get('/getsongsartist', findSongsByArtist); //listo
router.get('/search/:general', findgeneral);//listo
router.get('/Songsexplicit/:explicit', findSongsByExplicit);//listo
router.delete('/deletesongsforname/:name_track', SongsDeletename);//listo
router.delete('/deletesongsforid', SongsDelete);// listo
router.put('/editsongs/:_id', editSongById);//pendiente

//preguntar url o body

export default router;