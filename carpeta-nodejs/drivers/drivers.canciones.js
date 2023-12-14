import { Music } from "../models/models.canciones.js";

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
      res.status(404).json({ error: `No se han encontrado resultados para (${name_track})` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
export const findSongsByAlbum = async (req, res) => {// no funciona 
  try {
    const name_album = req.body.name_album;// const name_albu = req.body.album.name_album; Aqui guarda el nombre del album
    const albumDecodificado = decodeURIComponent(name_album);//esto se iria si usaramos body
    const Album = await Music.find({ 'album.name_album': albumDecodificado }); // se iria album decodificado y cambiaria por el nombre traido desde el body
    if (Album) {
      res.json(Album);
    } else {
      res.status(404).json({ error: `No se han encontrado resultados para (${Album})` });
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
      res.status(404).json({ error: `No se han encontrado resultados para (${_id})` });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al eliminar la canción' });
  }
};

export const SongsDeletename = async (req, res) => {
  try {
    const { name_track } = req.params;
    const cancion = await Music.findOne({ name_track });
    console.log(cancion);
    if (cancion) {
      await Music.findOneAndDelete({ name_track });
      res.json({ message: 'Canción eliminada correctamente' });
    } else {
      res.status(404).json({ error: `No se han encontrado resultados para (${name_track})` });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al eliminar la canción' });
  }
};

export const findSongsByExplicit = async (req, res) => {
  try {
    const { explicit } = req.params;
    const sexplicit = await Music.find({ explicit });
    if (sexplicit) {
      res.json(sexplicit);
    } else {
      res.status(404).json({ error: `No se han encontrado resultados para (${explicit})` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const findSongsByArtist = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    const songs = await Music.find({
      $or: [
        { artist: { $regex: new RegExp(name, 'i') } },
        { 'colaboracion.nombre_colaborador': { $regex: new RegExp(name, 'i') } },
      ]
    });
    if (songs.length > 0) {
      res.json(songs);
    } else {
      console.log(songs);
      res.status(404).json({ error: `No se han encontrado resultados para (${name})` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};


export const findgeneral = async (req, res) => {
  try {
    const { general } = req.params;
    console.log(general);
    const contenido = await Music.find({
      $or: [
        { artist: { $regex: new RegExp(general, 'i') } },
        { 'colaboracion.nombre_colaborador': { $regex: new RegExp(general, 'i') } },
        { 'album.name_album': { $regex: new RegExp(general, 'i') } },
        { name_track: { $regex: new RegExp(general, 'i') } }
      ]
    });
    if (contenido.length > 0) {
      res.json(contenido);
    } else {
      res.status(404).json({ error: `No se han encontrado resultados para (${general})` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};



export const editSongById = async (req, res) => {
  try {
    const _id = req.params;

    const existingSong = await Music.findByIdAndUpdate(
      _id,
      { $set: req.body },
      { new: true },
    );

    if (!existingSong) {
      return res.status(404).json({ error: 'No se encontró la canción' });
    }

    res.json(existingSong);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al editar la canción' });
  }
};
