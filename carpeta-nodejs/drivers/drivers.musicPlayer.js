import { player } from "../models/musicPlayer.model.js";
import { Music } from "../models/models.canciones.js";
import { busquedaSchema } from "../models/busqueda.usuarios.models.js";

export const play = async (req, res)=>{
    const _idUser= req.user._id
    const _idCancion= req.params._id
    console.log(_idCancion)


    try{
        const song = await Music.findOne({_id: _idCancion})
        const songHistorial= await busquedaSchema.findOne({cancionId: _idCancion})
        console.log(song)
        if(!song || !songHistorial){
            return res.status(404).json({error: "No se encontro la cancion"})
        }

        const nuevaBusqueda= await player.create({
            userId: _idUser, 
            cancionId: _idCancion,
            preview_url: song.preview_url || songHistorial.preview_url,
            songName: song.name_track || songHistorial.songName,
            songImage: song.img_urls || songHistorial.songImage,
            songArtist: song.artist || songHistorial.songArtist
        })
        await nuevaBusqueda.save();
        res.status(200).json({message: "Busqueda guardada con exito"})

    }catch (error){
        console.log(error)
        res.status(500).json({error:error})
    }
}