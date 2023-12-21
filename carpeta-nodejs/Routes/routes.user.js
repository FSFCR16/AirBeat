import { finduserByID ,postUser, getUser, getUserByEmail, getUserByUsername, deleteUserById, login,edituserById } from "../drivers/drivers.users.js";
import express from "express";
import {authVerification} from "../middleware/autenticacion.middlewere.js"
const routerUser = express.Router()

routerUser.post("/registrate", postUser)
routerUser.post("/login", login)
routerUser.get("/getUsers", getUser)
routerUser.get("/getUserByEmail/:email", authVerification, getUserByEmail)
routerUser.get("/getUserByUsername/:userName", getUserByUsername)
routerUser.delete("/deleteUser/:_id", deleteUserById)
routerUser.put("/editUser",authVerification, edituserById)
routerUser.get("/getuser/:_id", finduserByID)


export default routerUser