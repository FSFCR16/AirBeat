import mongoose from "mongoose";
import { Music } from "./models.canciones.js";

const playlist = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: "User",
        unique: true
    },

    songs:{ 
        Music,
        type:Array,
        unique: true
    }
})

export const playlists= mongoose.model("playlists", playlist)
