import  {Registro} from '../models/models.historial.js';

export const registrarBusqueda = async (usuario, busqueda) => {
    try {
        await Registro.create({ usuario, busqueda });
    } catch (error) {
        console.error('Error al registrar búsqueda:', error);
    }
};

