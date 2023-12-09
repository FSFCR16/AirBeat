import express from 'express'; // se llama express que es un framework de node para crear servidores web
import connectToDataBase from './Config/db.js';
import dotenv from 'dotenv';  // se llama dotenv que es un modulo que permite usar variables de entorno
import songsrouter from './Routes/routes.js'; // se llama el archivo de rutas y se importan las funciones

dotenv.config();  // se llama la funcion config de dotenv
const PORT= process.env.PORT;  // se crea una constante que guarda el puerto de la variable de entorno
const app = express();  // se crea una constante que guarda la funcion express
connectToDataBase(); // se llama la funcion que conecta con la base de datos

app.use(express.json());  // se usa la funcion json de express
app.use("/songs", songsrouter);  // se usa la funcion use de express para que el servidor use las rutas del archivo de rutas")

app.listen(PORT, () => {
  console.log('La aplicación de Airbeat está en ejecución en el puerto,',PORT);  // se usa la funcion listen de express para que el servidor escuche en el puerto 3000
});
