import express from 'express';
import { historyuser } from '../drivers/drivers.historial.js';
import {registrarBusqueda}from '../middleware/registrobusqueda.js';

const historialrouter = express.Router();

historialrouter.get('/busquedas/:usuario',registrarBusqueda,historyuser);

export default historialrouter;

