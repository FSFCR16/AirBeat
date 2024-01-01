import mongoose from "mongoose";
import { busquedaSchema } from "./busqueda.usuarios.models.js";

const musicPlayer = new mongoose.Schema({
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
    preview_url:{
        type: String,
        require: true
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

export const player= mongoose.model("musicPlayers", musicPlayer)