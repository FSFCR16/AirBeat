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
     return res.json(Songs);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener la lista de canciones' });
  }
};

export const findSongByName = async (req, res) => {
  try {
    const name_track = req.params.name_track;
    console.log(name_track)
    const regex = new RegExp(name_track, 'i');
    console.log(regex)
    const song = await Music.findOne({ name_track: { $regex: regex } });


    if (song) {
      return res.status(200).json(song);
    } else {
      return res.status(404).json({ error: 'Canción no encontrada' });
    }
  } catch (error) {

    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const findSongByID = async (req, res) => {
  try {
    const { _id } = req.params;
    const song = await Music.findById(_id);
    console.log(song);
    if (song) {
      return res.json(song);
    } else {
      return res.status(404).json({ error: `No se han encontrado resultados para (${_id})` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const findSongsByAlbum = async (req, res) => {// no funciona 
  try {
    const name_album = req.params.name_album;// const name_albu = req.body.album.name_album; Aqui guarda el nombre del album
    const albumDecodificado = decodeURIComponent(name_album);//esto se iria si usaramos body
    const Album = await Music.find({ 'album.name_album': { $regex: new RegExp(albumDecodificado, 'i') } });

    if (Album) {
      return res.json(Album);
    } else {
      return res.status(404).json({ error: `No se han encontrado resultados para (${Album})` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};


export const SongsDelete = async (req, res) => {
  try {
    const { _id } = req.params;
    const cancion = await Music.findById(_id);

    if (cancion) {
      await Music.findByIdAndDelete(_id);
      return res.json({ message: 'Canción eliminada correctamente' });
    } else {
      return res.status(404).json({ error: `No se han encontrado resultados para (${_id})` });
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
      return res.json({ message: 'Canción eliminada correctamente' });
    } else {
      return res.status(404).json({ error: `No se han encontrado resultados para (${name_track})` });
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
      return res.json(sexplicit);
    } else {
      return res.status(404).json({ error: `No se han encontrado resultados para (${explicit})` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const findSongsByArtist = async (req, res) => {
  try {
    const { name } = req.params;
    console.log(name);
    const songs = await Music.find({
      $or: [
        { 'collaboration.collaborators_name': { $regex: new RegExp(name, 'i') } },
        { artist: { $regex: new RegExp(name, 'i') } },

      ]
    });
    if (songs.length > 0) {
      return res.json(songs);
    } else {
      console.log(songs);
      return res.status(404).json({ error: `No se han encontrado resultados para (${name})` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};


export const findgeneral = async (req, res) => {
  try {
    const { general } = req.params;
    const contenido = await Music.find({
      $or: [
        { artist: { $regex: new RegExp(general, 'i') } },
        { 'collaboration.collaborators_name': { $regex: new RegExp(general, 'i') } },
        { 'album.name_album': { $regex: new RegExp(general, 'i') } },
        { name_track: { $regex: new RegExp(general, 'i') } }
      ]
    }).limit(4);
    if (contenido.length > 0) {
      return res.json(contenido);
    } else {
      return res.status(404).json({ error: `No se han encontrado resultados para (${general})` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};



export const editSongById = async (req, res) => {
  try {
    const _id = req.params;
    const updatedate = req.body;
    console.log(updatedate)
    const existingSong = await Music.findOneAndUpdate({ _id: _id }, updatedate, { new: true });
    if (!existingSong) {
      return res.status(404).json({ error: 'No se encontró la canción' });
    }
    return res.json(existingSong);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al editar la canción' });
  }
};
