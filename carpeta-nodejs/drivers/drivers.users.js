import { get } from "mongoose";
import { User } from "../models/models.users.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const postUser= async (req, res)=>{
    try{
        let user= req.body.user

        user.password = bcrypt.hashSync(user.password, parseInt(process.env.SALTROUNDS))
        user.confirmPass= bcrypt.hashSync(user.confirmPass, parseInt(process.env.SALTROUNDS))

        let newUser= await User.create(user)
        
        const payload={_id: newUser._id}

        let token = await jwt.sign(payload, process.env.JWT_KEY)

        const userData = {
            token,
            newUser
        }
        res.send(userData)

    }catch(errord){
        res.status(500).json({ error: 'Error al crear un nuevo usuario', errorDOS: errord});
    }
}

export const login =async (req, rest)=>{
    try {
        let body = req.body 
        let userExist = await User.findOne({
            email: body.email
        })
        console.log(userExist)
        console.log(body.password)
        console.log(body)
        if(!userExist){
            return rest.status(404).json({error:"No existe un usuario con este Email"})

        }
        const claveValidada = bcrypt.compareSync(body.password, userExist.password)
        if(claveValidada){
            const payload={_id:userExist._id}
            const token = jwt.sign(payload, process.env.JWT_KEY)

            const userData = {token,userExist}
            return rest.send(userData)
        } else {
            return rest.status(409).send({error:"credenciales incorrectas"})
        }
    } catch (error){
        return rest.send(error)
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

// export const UpdatePasswordByID = async (req, res)=>{
//     try{
//         let userId= req.params._id
//         const password = req.body.password

//         let user= await User.findOneAndUpdate(
//             {_id: userId},
//             { password: password},
//             { new: true }
//         );
//             console.log(user)
//         return res.json(user)
        
//     }catch(error){
//         res.status(500).json({ error: 'Error al eleminar usuario(s)', errorType:error.message = "Algun inconveniente, verifica de nuevo" });
//     }
// } update para despues
