import mongoose from "mongoose"; //conexion a la base de datos

const connectToDataBase = async () =>{
    await mongoose.connect(process.env.BASEDATA_URL) 
    try{
        console.log("Conectado exitosamente")
    }catch(err){
        console.log("No conectado "+err)
    
    }
};
export default connectToDataBase;