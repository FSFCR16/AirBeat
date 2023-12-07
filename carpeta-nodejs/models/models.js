import mongoose from 'mongoose';//importamos mongoose

const colaboracionSchema = new mongoose.Schema({
    numero_colaboradores: {
        type: Number,
    },
    nombre_colaborador: {
        type: [String], // Si esperas una lista de nombres de colaboradores
    }
}, { _id: false });

const SongsSchema = new mongoose.Schema({
    name_album:{
        type: String,
        required: true,
    },
    track_number:{
        type:Number,
    },
    
    release_date: {
        type: Date,
        required: true,
    },
    colaboracion: colaboracionSchema, // Usar el subesquema de colaboracion
    artist: {
        type: String,
    },
    duration_ms: {
        type: Number,
        required: true,
    },
    explicit: {
        type: Boolean,
        required: true,
    },
    img_urls: {
        img_url_640: {
            type: String,
            required: true,
        },
        img_url_300: {
            type: String,
            required: true,
        },
        img_url_64: {
            type: String,
            required: true,
        },
    },
    name_track: {
        type: String,
        required: true,
    },
    preview_url: {
        type: String,
        required: true,
    },
});
export const Music = mongoose.model('Songs', SongsSchema);//exportamos el modelo de la base de datos



