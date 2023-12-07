import { Music } from "../models/models.js";

export const SongsPost = async (req, res) => {
 console.log(req.body);
  try {
    const body= req.body;
    const newSongs = await Music.create(body);  
    res.status(201).json(newSongs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al crear un nueva cancion'} );
  }
};

export const SongsGet = async (req, res) => {
  console.log(req.body);
  try {
    const Songs = await Music.find(); // se crea una constante que guarda la funcion find de mongoose
    res.json(Songs);// se usa la funcion json de express para mostrar l
  } catch (error) { // se crea un catch para mostrar un mensaje de error en caso de que no se pueda obtener la lista de futbolistas
    res.status(500).json({ error: 'Error al obtener la lista de canciones' });
  }
};


