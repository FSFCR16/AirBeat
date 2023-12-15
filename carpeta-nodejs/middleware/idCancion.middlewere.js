import { busquedaSchema } from "../models/busqueda.usuarios.models.js";

export const cancionEnLaBase= async (req, res, next)=>{

    try{
        const body= req.params._id
    
        const cancionExist= await busquedaSchema.findOne({cancionId: body})
        
        if(cancionExist){
            const borrarDoc= await busquedaSchema.deleteOne({cancionId:body})
            next()
            // return res.status(409).json({message: "La cancion ya esta guardada"})
        }else{
            next()
        }
    
    }catch(error){
        res.status(500).json({error: error})
    }



}