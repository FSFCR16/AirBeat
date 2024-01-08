import {
  Album
} from "../models/models.admin.js";
import {
  Music
} from "../models/models.canciones.js";

function normalizeText(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
export const SongsPost = async (req, res) => {
  try {
    const body = req.body;
    const newSongs = await Music.create(body);
    res.status(201).json(newSongs);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Error al crear un nueva cancion'
    });
  }
};

export const SongsGet = async (req, res) => {
  try {
    const Songs = await Music.find();
    return res.json(Songs);
  } catch (error) {
    return res.status(500).json({
      error: 'Error al obtener la lista de canciones'
    });
  }
};

export const findSongByName = async (req, res) => {
  try {
    const name_track = req.params.name_track;
    const regex = new RegExp(name_track, 'i');
    const song = await Music.find({
      name_track: {
        $regex: regex
      }
    });

    if (song) {
      return res.status(200).json(song);
    } else {
      return res.status(404).json({
        error: 'Canción no encontrada'
      });
    }
  } catch (error) {

    return res.status(500).json({
      error: 'Error en el servidor'
    });
  }
};

export const findSongByID = async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    const song = await Music.findById(_id);
    console.log(song);
    if (song) {
      return res.json(song);
    } else {
      return res.status(404).json({
        error: `No se han encontrado resultados para (${_id})`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error en el servidor'
    });
  }
};

export const findSongsByAlbum = async (req, res) => { // no funciona 
  try {
    const name_album = req.params.name_album; // const name_albu = req.body.album.name_album; Aqui guarda el nombre del album
    const albumDecodificado = decodeURIComponent(name_album); //esto se iria si usaramos body
    const Album = await Music.find({
      'album.name_album': {
        $regex: new RegExp(albumDecodificado, 'i')
      }
    });
    if (Album) {
      return res.json(Album);
    } else {
      return res.status(404).json({
        error: `No se han encontrado resultados para (${Album})`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error en el servidor'
    });
  }
};


export const SongsDelete = async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    const cancion = await Music.findById(_id);

    if (cancion) {
      await Music.findByIdAndDelete(_id);
      return res.json({
        message: 'Canción eliminada correctamente'
      });
    } else {
      return res.status(404).json({
        error: `No se han encontrado resultados para (${_id})`
      });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Error al eliminar la canción'
    });
  }
};

export const SongsDeletename = async (req, res) => {
  try {
    const {
      name_track
    } = req.params;
    const cancion = await Music.findOne({
      name_track
    });
    console.log(cancion);
    if (cancion) {
      await Music.findOneAndDelete({
        name_track
      });
      return res.json({
        message: 'Canción eliminada correctamente'
      });
    } else {
      return res.status(404).json({
        error: `No se han encontrado resultados para (${name_track})`
      });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Error al eliminar la canción'
    });
  }
};

export const findSongsByExplicit = async (req, res) => {
  try {
    const {
      explicit
    } = req.params;
    const sexplicit = await Music.find({
      explicit
    });
    if (sexplicit) {
      return res.json(sexplicit);
    } else {
      return res.status(404).json({
        error: `No se han encontrado resultados para (${explicit})`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error en el servidor'
    });
  }
};

export const findSongsByArtist = async (req, res) => {
  try {
    const {
      name
    } = req.params;
    console.log(name);
    const songs = await Music.find({
      $or: [{
          'collaboration.collaborators_name': {
            $regex: new RegExp(name, 'i')
          }
        },
        {
          artist: {
            $regex: new RegExp(name, 'i')
          }
        },

      ]
    });
    if (songs.length > 0) {
      return res.json(songs);
    } else {
      console.log(songs);
      return res.status(404).json({
        error: `No se han encontrado resultados para (${name})`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error en el servidor'
    });
  }
};


export const findgeneral = async (req, res) => {
  try {
    const {
      general
    } = req.params;
    let matchType = '';
    let albumLength = 0
    const normalizedGeneral = normalizeText(general)
    const contenido = await Music.find({
      $or: [{
          artist: {
            $regex: new RegExp(general, 'i')
          }
        },
        {
          'album.name_album': {
            $regex: new RegExp(general, 'i')
          }
        },
        {
          name_track: {
            $regex: new RegExp(general, 'i')
          }
        }
      ]
    }).limit(4);

    if (contenido.length > 0) {
      const resultados = contenido.map(item => {
        console.log(item.name_track)
        if (item.artist && normalizeText(item.artist).match(new RegExp(normalizedGeneral, 'i'))) {
          matchType = 'Artista';
        } else if (item["album"]["name_album"] && normalizeText(item["album"]["name_album"]).match(new RegExp(normalizedGeneral, 'i'))) {
          matchType = 'Album';
        } else if (item.name_track && normalizeText(item.name_track).match(new RegExp(normalizedGeneral, 'i'))) {
          matchType = 'Cancion';
        }

        return {
          ...item.toObject(),
          matchType
        };
      });
      if (matchType === "Album") {
        const album = await Music.find({
          'album.name_album': {
            $regex: new RegExp(general, 'i')
          }
        })
        albumLength = album.length
        return res.status(200).json({
          resultado: resultados,
          type: matchType,
          length: albumLength
        });
      } else {
        return res.status(200).json({
          resultado: resultados,
          type: matchType
        });
      }
    } else {
      return res.status(404).json({
        error: `No se han encontrado resultados para (${general})`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error en el servidor'
    });
  }
};



export const editSongById = async (req, res) => {
  try {
    const _id = req.params;
    const updatedate = req.body;
    console.log(updatedate)
    const existingSong = await Music.findOneAndUpdate({
      _id: _id
    }, updatedate, {
      new: true
    });
    if (!existingSong) {
      return res.status(404).json({
        error: 'No se encontró la canción'
      });
    }
    return res.json(existingSong);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Error al editar la canción'
    });
  }
};

export const albums = async (req, res) => {
  try {
    let arrayAlbums = []
    const nombresAlbumes = await Music.aggregate([{
        $group: {
          _id: '$album.name_album'
        }
      },
      {
        $project: {
          _id: 0,
          album: '$_id'
        }
      }
    ]);

    let albums = nombresAlbumes
      .map(album => album.album)
      .filter(album => album !== null)

    for (let i = 0; i < albums.length; i++) {
      const nameAlbum = albums[i]
      let album = await Music.findOne({
        'album.name_album': nameAlbum
      })
      arrayAlbums.push(album)
    }

    return res.status(200).json({
      albums: arrayAlbums
    })

  } catch (error) {
    console.log('Error al buscar los nombres de los álbumes:', error);
  }

}

export const cancionesAleatorias = async (req, res) => {
  try {
    const resultados = await Music.aggregate([{
      $sample: {
        size: 5
      }
    }]); // Obtener 5 documentos aleatorios

    return res.status(200).json(resultados);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
