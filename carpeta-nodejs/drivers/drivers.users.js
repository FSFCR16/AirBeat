import { get } from "mongoose";
import { User } from "../models/models.users.js";

export const postUser= async (req, res)=>{
    try{
        let user= req.body
        let newUser= await User.create(user)
        res.status(200).json(newUser)
    }catch(error){
        res.status(500).json({ error: 'Error al crear un nuevo usuario', error: error});
    }
}

export const getUser= async (req, res)=>{
    try{
        let getUser= await User.find()
        res.status(200).json(getUser)
    }catch(error){
        res.status(500).json({ error: 'Error al traer a los usuarios' });
    }
}

export const getUserByUsername= async (req, res)=>{
    try{
        const buscarTerm= req.params.userName
        let getUsername= await User.find({ userName: { $regex: buscarTerm , $options: "i" } })
        res.status(200).json(getUsername)

        if(getUsername[0]==""){
            res.json("Usuario no encontrado")
        }else{
            res.status(200).json(getUsername)
        }

    }catch(error){
        res.status(500).json({ error: 'Error al traer a los usuarios' });
    }
}


export const getUserByEmail= async (req, res)=>{
    try{
        let email= req.params.email
        let getUserEmail= await User.findOne({email})
        
        
        if(getUserEmail === null){
            return res.json("Email no existe")
        }else{
            return res.status(200).json(getUserEmail)
        }

    }catch(error){
        res.status(500).json({ error: 'Error al traer a los usuarios' });
    }
}

export const deleteUserById = async (req, res)=>{
    try{
        let userId= req.params._id

        let user= await User.findByIdAndDelete({_id: userId})
        
        return res.json(user)
        a
    }catch(error){
        res.status(500).json({ error: 'Error al eleminar usuario(s)', errorType:error.message = "Algun inconveniente, verifica de nuevo" });
    }
}