import mongoose from "mongoose"

const busquedaUser =new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require:true
    },
    cancionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Songs",
        require: true
    },
    date: {
        type:Date,
        default: Date.now
    }
})

export const busquedaSchema= mongoose.model("busquedas", busquedaUser)