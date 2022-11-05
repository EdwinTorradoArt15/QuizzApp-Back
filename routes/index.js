import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {
  mostrarCategorias,
  registarCategoria,
  eliminarCategorias,
  editarCategorias,
} from "../controllers/Categories.js";
import fileUpload from "express-fileupload";
import { registrarCuestionario } from "../controllers/Cuestionario.js";

// Inicializamos express
const router = express.Router();

// Rutas
router.get("/users", verifyToken, getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.post("/token", refreshToken);
router.delete("/logout", Logout);

// Rutas de las categorias
router.get("/categories", mostrarCategorias);
router.post("/categories", registarCategoria);
router.delete('/categories/:id', eliminarCategorias)
router.put('/categories/:id', editarCategorias)

//Rutas de los cuestionarios

/* router.get('/cuestionaries', getUsers) */
router.post('/cuestionaries', registrarCuestionario)
/* router.delete('/cuestionaries/:id', Register)
router.put('/cuestionaries/:id', Register)  */

export default router;
