import mongoose from 'mongoose';

const BusquedaSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
    },
    busqueda: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        default: Date.now,
    },
});

export const Registro = mongoose.model('Busqueda', BusquedaSchema);
