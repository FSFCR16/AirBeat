import mongoose from 'mongoose';

const colaboracionSchema = new mongoose.Schema({
    numero_colaboradores: {
        type: Number,
    },
    nombre_colaborador: {
        type: [String],
        required: true,
    }
}, { _id: false });

const albumSchema = new mongoose.Schema({

    track_number: {
        type: Number,
        required: true,
    },

    name_album: {
        type: String,
        required: true,
    },


}, { _id: false });

const SongsSchema = new mongoose.Schema({

album: albumSchema,

    name_track: {
        type: String,
        required: true,
    },

    release_date: {
        type: Date,
        required: true,
    },
    colaboracion: colaboracionSchema,
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
    preview_url: {
        type: String,
        required: true,
    },
});
export const Music = mongoose.model('Songs', SongsSchema);