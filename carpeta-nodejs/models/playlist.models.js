import mongoose from "mongoose";
import { Music } from "./models.canciones.js";

const playlist = new mongoose.Schema({
    namePlaylist:{
        type:String,
        require:true,
        unique:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: "User",
        unique: false 
    },

    songs:{ 
        Music,
        type:Array,
    }
    
})

export const playlists= mongoose.model("playlists", playlist)
