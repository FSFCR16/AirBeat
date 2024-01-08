import { Music } from "../models/models.canciones.js";


export const songIn =async (req, res, next) => {
    try{
        const track_number = req.body.album.track_number
        const name_album=  req.body.album.name_album

        let cancion = await Music.findOne({
            "album.track_number": track_number,
            "album.name_album": name_album
            })
        if(cancion !== null){
            return res.json("Esta cancion ya tiene una posicion en este album")
        }else{
            next()
        }

    }catch(error){
        console.error({error: error})
    }

}