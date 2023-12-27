import {
    playlists
} from "../models/playlist.models.js";

export const verificarName = async (req, res, next) => {
    try {
        const body = req.body

        const existName = await playlists.findOne({
            namePlaylist: body.namePlaylist
        })
        console.log(existName)
        if (existName) {
            return res.status(409).json({
                message: "Ya existe una playlist con este nombre"
            })
        } else {
            next()
        }
    }catch(e){
        return res.status(500).json({error: e})
    }

}