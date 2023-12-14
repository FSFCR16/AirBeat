import { busquedaSchema } from "../models/busqueda.usuarios.models.js";

export const historial = async (res, req)=>{
    const {userId, busqueda}= req.body

    try{
        const nuevaBusqueda= new busquedaSchema({userId, busqueda})
        await nuevaBusqueda.save();
        res.status(200).json({message: "Busqueda guardada con exito"})

    }catch (error){
        res.status(500).json({error:error})
    }
}
