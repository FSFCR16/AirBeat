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
        unique:true

    },
    songName:{
        type: String,
        require: true
    },
    songImage:{
        type: Array,
        require: true
    },
    songArtist:{
        type: String,
        require: true,
        default: "Unknown"
    },
    date: {
        type:Date,
        default: Date.now
    }

})

export const busquedaSchema= mongoose.model("busquedas", busquedaUser)