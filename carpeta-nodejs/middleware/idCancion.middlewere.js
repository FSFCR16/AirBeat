import { busquedaSchema } from "../models/busqueda.usuarios.models.js";

export const cancionEnLaBase= async (req, res, next)=>{

    try{
        const body= req.params._id
    
        const cancionExist= await busquedaSchema.findOne({cancionId: body})
        
        if(cancionExist){
            await busquedaSchema.deleteOne({cancionId:body})
            next()
        }else{
            next()
        }
    
    }catch(error){
        res.status(500).json({error: error})
    }



}