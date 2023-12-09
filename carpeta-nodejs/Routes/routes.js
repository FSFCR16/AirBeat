import express from 'express';// se llama express que es un framework de node para crear servidores web
import { SongsPost, SongsGet, SongsDelete,findSongByName,findSongsByAlbum,SongsDeletename} from '../drivers/drivers.js';// se llama el archivo de controlador y se importan las funciones

const router = express.Router();
router.post('/postsongs', SongsPost);
router.get('/getsongsmassive', SongsGet);
router.get('/getsongsforname', findSongByName);
router.get('/getlbum', findSongsByAlbum);// no funciona
router.delete('/deletesongsforname', SongsDeletename);
router.delete('/deletesongsforid', SongsDelete);
//filtro de explicit,busqueda por artista,genero

export default router;