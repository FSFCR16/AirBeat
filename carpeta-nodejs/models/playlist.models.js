import mongoose from "mongoose";
import { Music } from "./models.canciones.js";

const playlist = new mongoose.Schema({
    namePlaylist:{
        type:String,
        require:true,
        unique:false,
        default: "Mi Playlist"
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require:true,
        unique: false 
    },

    songs:{ 
        Music,
        type:Array,
    }
    
})

export const playlists= mongoose.model("playlists", playlist)
