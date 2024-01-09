import {
    response
} from "express";
import {
    Music
} from "../models/models.canciones.js";
import {
    playlists
} from "../models/playlist.models.js";


export const createPlaylist = async (req, res) => {

    try {
        const userId = req.user._id;

        const playlist = new playlists({
            userId,
        });
        console.log(playlist)
        const newPlaylist = await playlist.save();
        if(playlist){
            const idPlaylist = playlist._id
            console.log(idPlaylist)
            const encontarPlaylist= await  playlists.findOne({_id: idPlaylist})
            if(encontarPlaylist){
                return res.status(200).json(encontarPlaylist);
            }else{
                return res.status(404).json({message: "Playlist no encontrada"})
            }
        }else{
            return res.status(422).json({message: "No se pudo crear la playlist"})
        }

    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};
export const postPlaylist = async (req, res) => {
    try {
        const _id = req.params._id
        const song = req.params._idsong

        const songPush = await Music.findOne({
            _id: song
        })

        if (!songPush) {
            return res.status(404).json({
                message: "cancion no encontrada"
            })
        }

        const playlist = await playlists.findOneAndUpdate({
            _id: _id
        }, {
            $push: {
                songs: songPush
            }
        }, {
            new: true,
            upsert: true
        })

        res.status(200).json({
            message: "Guardado con exito"
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}

export const traerPlaylistIdUser = async (req, res) => {
    try {
        const idUser = req.user._id


        const playlist = await playlists.find({
            idUser: idUser,
        })

        if (!playlist) {
            return res.status(404).json({
                error: "Esta persona no tiene ninguna playlist"
            })
        }

        return res.status(200).json({
            message: playlist
        })

    } catch (e) {
        res.status(500).json({
            err: e
        })
    }

}

export const traerPlaylistsId = async (req, res) => {
    try {
        const idUser = req.user._id

        const playlist = await playlists.find({
            userId: idUser
        })

        if (!playlist) {
            return res.status(404).json({
                error: "Playlist no encontarda"
            })
        }

        return res.status(200).json(playlist)

    } catch (e) {
        res.status(500).json({
            err: e
        })
    }

}

export const traerPlaylistById = async (req, res) => {
    try {
        const id = req.params._id

        const playlist = await playlists.find({
            _id: id
        })
        if (playlist.length === 0) {
            return res.status(404).json({
                message: "Playlist no encontarda"
            })
        }

        return res.status(200).json(playlist)

    } catch (e) {
        res.status(500).json({
            err: e
        })
    }

}

export const deletePlaylist = async (req, res) => {
    try {
        const idPlaylist = req.params._id
        const playlist = await playlists.deleteOne({
            _id: idPlaylist
        })

        if (!playlist) {
            return res.status(409).json({
                message: "No se puedo elminar la playlist"
            })
        }

        res.status(200).json({
            message: "Playlist eleminada"
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}

export const deleteSongPlaylist = async (req, res) => {
    try {
        const idPlaylist = req.params._id
        const idCancion = req.params._idsong
        console.log(idCancion, idPlaylist)
        const playlist = await playlists.findOne({
            _id: idPlaylist
        })

        if (playlist) {
            const cancion = playlist.songs
            console.log(cancion)
            for (let i = 0; i < cancion.length; i++) {
                const id = cancion[i]._id
                if (id.toString() === idCancion) {
                    const borrarCancion = cancion.splice(i, 1)
                    console.log(borrarCancion)
                    break;
                }
            }

            await playlists.findByIdAndUpdate(idPlaylist, {
                songs: cancion
            });

            return res.status(200).json({
                message: "Cancion eleminada de la paylist"
            })
        } else {
            res.status(404).json({
                error: "Cancion no encontrada"
            })
        }
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}

export const changeName = async (req, res) => {
    try {
        const idPlaylist = req.params._id
        const newName = req.body.namePlaylist
        console.log(idPlaylist, newName)
        const newNamePlaylist = await playlists.findOneAndUpdate({
            _id: idPlaylist
        }, {
            namePlaylist: newName
        }, {
            new: true,
        })

        if (newNamePlaylist) {
            return res.status(200).json({
                message: "Nombre actulizado"
            })
        }else{
            return res.status(409).json({message: "No se encontro ninguna playlist"})
        }

    }catch(e){

        if(e.codeName == "DuplicateKey"){
            return res.status(500).json({error:e.codeName, message: "Ya tienes una playlist con este nombre, intenta algo nuevo"})
        }

    }

}