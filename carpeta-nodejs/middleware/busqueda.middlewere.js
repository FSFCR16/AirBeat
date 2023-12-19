import { busquedaSchema } from "../models/busqueda.usuarios.models.js";

export const verifyUser = async(req, res, next)=>{
    try {
        const idUser = req.user._id
        const idCancion = req.params._id
        
        const cancionInUser = await busquedaSchema.findOneAndDelete({userId: idUser, cancionId:idCancion})

        next();
    }catch (error) {
        return res.status(500).json({ message: "Ha ocurrido un error al procesar la canción", error: error.message });
    }

}