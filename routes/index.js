import express from "express";
import {
  Register,
  Login,
  Logout,
  UpdateUser,
  getUser,
} from "../controllers/Users.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {
  mostrarCategorias,
  registarCategoria,
} from "../controllers/Categories.js";
import {
  mostrarTodosCuestionarios,
  mostrarTodosCuestionariosPorUsuario,
  registrarCuestionario,
  registrarPreguntas,
} from "../controllers/Cuestionario.js";

// Inicializamos express
const router = express.Router();

// Rutas
router.get("/user/:id", getUser);
router.post("/users", Register);
router.post("/login", Login);
router.put("/users/update/:id", UpdateUser);
router.post("/token", refreshToken);
router.delete("/logout", Logout);

// Rutas de las categorias
router.get("/categories", mostrarCategorias);
router.post("/categories", registarCategoria);

//Rutas de los cuestionarios

router.post("/cuestionaries", registrarCuestionario);
router.post("/cuestionaries/preguntas", registrarPreguntas);
router.get("/cuestionaries/preguntas", mostrarTodosCuestionarios);
router.post("/cuestionaries/usuario", mostrarTodosCuestionariosPorUsuario);

export default router;
