import {Registro}  from '../models/models.historial.js';
export const historyuser = async (req, res) => {
    try {
        const { usuario } = req.params;
        const busquedas = await Registro.find({ usuario }).sort({ fecha: -1 });
        res.json(busquedas);
    } catch (error) {
        console.error('Error al obtener búsquedas anteriores:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};
