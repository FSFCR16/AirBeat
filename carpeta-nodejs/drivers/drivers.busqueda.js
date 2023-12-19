import { busquedaSchema } from "../models/busqueda.usuarios.models.js";
import { Music } from "../models/models.canciones.js";





export const historial = async (req, res)=>{
    const _idUser= req.user._id
    const _idCancion= req.params._id

    try{
        const song = await Music.findById(_idCancion)

        if(!song){
            return res.status(404).json({error: "No se encontro la cancion"})
        }

        const nuevaBusqueda= new busquedaSchema({
            userId: _idUser, 
            cancionId: _idCancion,
            songName: song.name_track,
            songImage: song.img_urls,
            songArtist: song.artist
        })
        await nuevaBusqueda.save();
        res.status(200).json({message: "Busqueda guardada con exito"})

    }catch (error){
        res.status(500).json({error:error})
    }
}


export const getHistorial = async(req, res)=>{

    try{
        const userId= req.user._id

        const historial = await busquedaSchema
        .find({userId: userId})
        .limit(5)
        .sort({createdAt: -1})
        
        return res.status(200).json({message:"Historial", historial:historial })

    }catch(error){
        return res.status(500).json({ message: "Error al obtener el historial", error: error.message });
    }


}
