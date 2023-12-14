import jwt from "jsonwebtoken"

const key = process.env.JWT_KEY

const descencriptacionToken= (req, res, next)=>{
    const token= req.headers.authorization

    if(!token){
        return res.status(403).send({message: "Tonken no enviado"})
    }

    jwt.verify(token, key, (err, decode)=>{
        if(err){
            return res.status(401).send({message: "Token invalido"})

        }

        req.user = decode; // Puedes guardar la información del usuario para usarla en la solicitud siguiente
        next();
    })
}