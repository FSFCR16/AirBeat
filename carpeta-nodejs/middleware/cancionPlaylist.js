import { playlists } from "../models/playlist.models.js";
import { Music } from "../models/models.canciones.js";

export const verifyPlaylist = async(req, res, next)=>{
    try {
        const idSong =req.params._idsong
        const id = req.params._id

        const playlist = await playlists.find({
            _id: id
        })

        const cancion = await Music.findOne({
            _id: idSong
        })
        for (const element of playlist[0].songs) {
            if (element._id.toString() === cancion._id.toString()) {
                return res.status(409).json({ message: "Esta canción ya se encuentra en esta playlist" });
            }
        }


        next()

    }catch (error) {
        return res.status(500).json({ message: "Ha ocurrido un error al procesar la canción", error: error.message });
    }

}