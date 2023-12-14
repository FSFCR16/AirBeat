import { postUser, getUser, getUserByEmail,getUserByUsername, deleteUserById, login } from "../drivers/drivers.users.js";
import express  from "express";

const routerUser = express.Router()

routerUser.post("/registrate", postUser)
routerUser.post("/login", login)
routerUser.get("/getUsers", getUser )
routerUser.get("/getUserByEmail/:email", getUserByEmail )
routerUser.get("/getUserByUsername/:userName", getUserByUsername )
routerUser.delete("/deleteUser/:_id", deleteUserById)

export default routerUser