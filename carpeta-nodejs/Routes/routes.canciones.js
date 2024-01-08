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
    findSongByID,
    albums,
    cancionesAleatorias
} from '../drivers/drivers.canciones.js'; // se llama el archivo de controlador y se importan las funciones
 
import { play, getsong} from '../drivers/drivers.musicPlayer.js';
import {songIn} from '../middleware/cancionExiste.middelwere.js';
import { authVerification } from '../middleware/autenticacion.middlewere.js';
import { historial } from '../drivers/drivers.busqueda.js';
import { cancionEnLaBase } from '../middleware/idCancion.middlewere.js';
import { unSoloDoc } from '../middleware/musicPlayer.middleware.js';

const router = express.Router();
//rutas para usuarios 
router.get('/search/track/:name_track', findSongByName);
router.get('/search/id/:_id', findSongByID);
router.get('/search/album/:name_album',authVerification, findSongsByAlbum); 
router.get('/search/artist/:name', findSongsByArtist); 
router.get('/search/:general', findgeneral);
router.get('/explicit/:explicit', findSongsByExplicit);
router.get('/all', SongsGet);
router.post('/musicPlayer/:_id', authVerification, unSoloDoc, play)
router.get('/music', authVerification, getsong)
router.get('/albums', authVerification, albums)
router.get('/aleatorias', cancionesAleatorias)

//rutas para admin
router.delete('/delete/name/:name_track', SongsDeletename);
router.delete('/delete/id/:_id', SongsDelete); 
router.put('/songs/edit:_id', editSongById);
router.post('/postsongs', songIn, SongsPost);
router.get('/getsongsmassive',authVerification,SongsGet);
router.get('/getsongsforname/:name_track', findSongByName);
router.get('/getlbum/:name_album',authVerification, findSongsByAlbum ); // no funciona
router.delete('/deletesongsforname', SongsDeletename);
router.delete('/deletesongsforid', SongsDelete);
//filtro de explicit,busqueda por artista,genero

export default router;