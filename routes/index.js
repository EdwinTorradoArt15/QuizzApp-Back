import express from "express";
import {
  Register,
  Login,
  Logout,
  UpdateUser,
  getUser,
  getUsers
} from "../controllers/Users.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {
  mostrarCategorias,
  registarCategoria,
  mostrarCuestionariosPorCategoria,
  deleteCategoria,
  getCategoria,
} from "../controllers/Categories.js";
import {
  mostrarTodosCuestionarios,
  mostrarTodosCuestionariosPorUsuario,
  registrarCuestionario,
  registrarPreguntas,
  mostrarCuestionarioPorId,
} from "../controllers/Cuestionario.js";
import { mostrarOpcionesPorPregunta, mostrarPreguntasPorCuestionario } from "../controllers/Preguntas.js";

// Inicializamos express
const router = express.Router();

// Rutas Usuarios
router.get("/user/:id", getUser);
router.get("/users", getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.put("/users/update/:id", UpdateUser);
router.post("/token", refreshToken);
router.delete("/logout", Logout);

// Rutas de las categorias
router.get("/categories", mostrarCategorias);
router.get("/categories/:id", getCategoria);
router.get("/categorias/:id", mostrarCuestionariosPorCategoria);
router.post("/categories", registarCategoria);
router.delete("/categories/:id", deleteCategoria);

//Rutas de los cuestionarios

router.post("/cuestionaries", registrarCuestionario);
router.post("/cuestionaries/preguntas", registrarPreguntas);
router.get("/cuestionaries/preguntas", mostrarTodosCuestionarios);
router.post("/cuestionaries/usuario", mostrarTodosCuestionariosPorUsuario);
router.get("/cuestionaries/categoria/:id", mostrarCuestionariosPorCategoria);
router.get("/cuestionaries/:id", mostrarCuestionarioPorId);

// Rutas de preguntas

router.post("/preguntas", mostrarPreguntasPorCuestionario);
router.post("/preguntas/opciones", mostrarOpcionesPorPregunta);

export default router;
