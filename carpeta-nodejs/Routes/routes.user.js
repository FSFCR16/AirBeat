import { postUser, getUser, getUserByEmail,getUserByUsername, deleteUserById, login, edituserById, finduserByID, editUser, verificacion } from "../drivers/drivers.users.js";
import express  from "express";
import { authVerification } from "../middleware/autenticacion.middlewere.js";
const routerUser = express.Router()

routerUser.post("/registrate", postUser)
routerUser.post("/login", login)
routerUser.get("/getUsers", authVerification, getUser )
routerUser.get("/getUserByEmail/:email", getUserByEmail )
routerUser.get("/getUserByUsername/:userName",authVerification, getUserByUsername )
routerUser.delete("/deleteUser/:_id", deleteUserById)
routerUser.put("/editUser",authVerification, edituserById)
routerUser.get("/getuser",authVerification, finduserByID)
routerUser.put("/editUsers/:_id", authVerification, editUser )
routerUser.get("/autorizar", authVerification, verificacion)
export default routerUser