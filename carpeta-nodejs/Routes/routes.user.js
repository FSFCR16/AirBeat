import { postUser, getUser, getUserByEmail,getUserByUsername, deleteUserById, login, edituserById, finduserByID, editUser } from "../drivers/drivers.users.js";
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
routerUser.get("/getuser/:_id", finduserByID)
routerUser.put("/editUsers/:_id", authVerification, editUser )
export default routerUser