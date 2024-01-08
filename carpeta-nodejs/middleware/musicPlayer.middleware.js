import { player } from "../models/busqueda.usuarios.models.js";

export const unSoloDoc = async (req, res, next) => {
    try {
        const id = req.user._id
        const count = await player.countDocuments({userId:id});
        
        if (count > 0) {
            await player.findOneAndDelete({userId: id});
        }
        return next();
    } catch (error) {
        console.log(error);
        next(error); 
    }
};