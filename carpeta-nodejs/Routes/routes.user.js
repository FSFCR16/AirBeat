import { postUser, getUser, getUserByEmail,getUserByUsername, deleteUserById } from "../drivers/drivers.users.js";
import express  from "express";

const routerUser = express.Router()

routerUser.post("/login", postUser)
routerUser.get("/getUsers", getUser )
routerUser.get("/getUserByEmail/:email", getUserByEmail )
routerUser.get("/getUserByUsername/:userName", getUserByUsername )
routerUser.delete("/deleteUser/:_id", deleteUserById)

export default routerUser