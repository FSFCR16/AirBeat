import { player } from "../models/busqueda.usuarios.models.js";
import { Music } from "../models/models.canciones.js";

export const play = async (req, res)=>{
    const _idUser= req.user._id
    const _idCancion= req.params._id


    try{
        const song = await Music.findOne({_id: _idCancion})

        if(!song){
            return res.status(404).json({error: "No se encontro la cancion"})
        }

        const nuevaBusqueda= await player.create({
            userId: _idUser, 
            cancionId: _idCancion,
            preview_url: song.preview_url,
            songName: song.name_track,
            songImage: song.img_urls,
            songArtist: song.artist
        })
        await nuevaBusqueda.save();
        res.status(200).json({message: "Busqueda guardada con exito"})

    }catch (error){
        console.log(error)
        res.status(500).json({error:error})
    }
}

export const getsong = async(req, res)=>{
    try{
        const idUser = req.user._id
        const cancionPlayer=await player.findOne({userId:idUser})
        console.log(cancionPlayer)
        if(!cancionPlayer){
            return res.status(404).json({message: "No se encontro ninguna cancion para este usuario"})
        }

        return res.status(200).json(cancionPlayer)
    }catch(error){
        return res.status(500).json(error)
    }



    
}