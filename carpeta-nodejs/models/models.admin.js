import mongoose from 'mongoose';

const colaboracionSchema = new mongoose.Schema({
    number_collaborators: {
        type: Number,
    },
    collaborators_name: {
        type: [String],
        required: true,
    }
}, {
    _id: false
});

const songSchema = new mongoose.Schema({
    name_track: {
        type: String,
        required: true,
    },
    release_date: {
        type: Date,
        required: true,
    },
    collaboration: colaboracionSchema,
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
        unique: true,
    },
});

const albumSchema = new mongoose.Schema({
    name_album: {
        type: String,
        required: true,
    },
    release_date: {
        type: Date,
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
    songs: [songSchema],
}, {
    _id: false
});

export const Album = mongoose.model('Album', albumSchema);
