import { Music } from "../models/models.js";

export const SongsPost = async (req, res) => {
  try {
    const body = req.body;
    const newSongs = await Music.create(body);
    res.status(201).json(newSongs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al crear un nueva cancion' });
  }
};


export const SongsGet = async (req, res) => {
  try {
    const Songs = await Music.find();
    res.json(Songs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de canciones' });
  }
};

export const findSongByName = async (req, res) => {
  try {
    const { name_track } = req.body;
    const song = await Music.findOne({ name_track });
    console.log(song);
    if (song) {
      res.json(song);
    } else {
      res.status(404).json({ error: 'Canción no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
export const findSongsByAlbum = async (req, res) => {// no funciona 
    try {
    const { name_album } = req.params;
    console.log(name_album);
    const Album = await Music.findOne({ 'album.name_album': name_album});
    console.log(Album);

    if (Album) {
      res.json(Album);
    } else {
      res.status(404).json({ error: 'No se encontro el album' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};


export const SongsDelete = async (req, res) => {
  try {
    const { _id } = req.body;
    const cancion = await Music.findById(_id);
    if (cancion) {
      await Music.findByIdAndDelete(_id);
      res.json({ message: 'Canción eliminada correctamente' });
    } else {
      res.status(404).json({ error: 'No se encontró la canción' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al eliminar la canción' });
  }
};

export const SongsDeletename = async (req, res) => {
  try {
    const { name_track } = req.body;
    const cancion = await Music.findOne({ name_track });
    if (cancion) {
      await Music.findOneAndDelete({ name_track });
      res.json({ message: 'Canción eliminada correctamente' });
    } else {
      res.status(404).json({ error: 'No se encontró la canción' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al eliminar la canción' });
  }
};

