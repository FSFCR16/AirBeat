import mongoose from "mongoose"

const busquedaUser =new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require:true,
        unique: false
    },
    cancionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Songs",
        require: true,
        unique:false

    },
    songName:{
        type: String,
        require: true,
        unique:false
    },
    songImage:{
        type: Array,
        require: true,
        unique:false
    },
    songArtist:{
        type: String,
        require: true,
        default: "Unknown",
        unique:false
    },
    date: {
        type:Date,
        default: Date.now,
        unique:false
    }

})

export const busquedaSchema= mongoose.model("busquedas", busquedaUser)