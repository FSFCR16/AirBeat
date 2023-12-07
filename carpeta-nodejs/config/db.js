import mongoose from "mongoose"; //conexion a la base de datos

const connectToDataBase = async () =>{
    await mongoose.connect(process.env.BASEDATA_URL) 
    //Por que se usa el async, el async lo usamos porque, la funcion de mongo espera el parametro de la uri
    //Este es una promesa el cual nos dira si se conecto con mongo o no
    try{
        console.log("Conectado exitosamente")
    }catch(err){
        console.log("No conectado "+err)
    }
};
export default connectToDataBase;