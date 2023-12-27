import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        require: true
    },
    lastname:{
        type:String,
        require:true
    },
    telefono:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true

    },
    confirmPass:{
        type:String,
        require:true
    },
    role:{
        type:String,
        default: "normal",
        enum:["admin", "normal", "premium"],
    }
})

export const User=mongoose.model('Users', UserSchema)