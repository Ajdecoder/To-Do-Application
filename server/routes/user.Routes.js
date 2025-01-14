import express from 'express';
import {Delete, Login, ReadAll, ReadOne, Register, Update, create} from '../controllers/userController.js'

const route = express.Router();

route.post("/create", create)
route.get("/readAll", ReadAll)
route.get("/readOne/:id", ReadOne)
route.put("/update/:id", Update)
route.delete("/delete/:id", Delete)
route.post("/register", Register)
route.post("/login", Login)

export default route