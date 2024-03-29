import { QueryTypes } from "sequelize";
import db from "../config/Database.js";
import Categoria from "../models/CategoriaModel.js";
import Cuestionario from "../models/CuestionarioModel.js";
import Opcion from "../models/OpcionesModel.js";
import Pregunta from "../models/PreguntasModel.js";
import Users from "../models/UserModel.js";

export const registrarCuestionario = async (req, res) => {
  const { idCategoria, tiempoTotal, idUsuarioCreador, nomCuest } = req.body;

  if (idCategoria && tiempoTotal && idUsuarioCreador && nomCuest) {
    try {
      const categoriaBuscada = await Categoria.findOne({
        where: {
          id: idCategoria,
        },
      });

      const usuarioBuscado = await Users.findOne({
        where: {
          id: idUsuarioCreador,
        },
      });
      if (categoriaBuscada && usuarioBuscado) {
        const cuestionarioCreado = await Cuestionario.create({
          idCategoria,
          tiempoTotal,
          idUsuarioCreador,
          nomCuest,
          estado: false,
        });

        res.status(201).json({
          msg: "Se creo el cuestionario exitosamente",
          cuestionario: cuestionarioCreado,
          success: true,
        });
      } else {
        res.status(400).json({
          success: false,
          msg: "No existe la categoria o el usuario escojido",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    res.status(400).json({
      success: false,
      msg: "Faltan datos",
    });
  }
};

export const registrarPreguntas = async (req, res) => {
  const data = req.body;

  const listaPreguntas = data.preguntas;

  try {
    listaPreguntas.forEach(async (pregunta) => {
      //Creamos la pregunta
      const preguntaCreada = await Pregunta.create({
        descripcion: pregunta.descripcion,
        respuesta: pregunta.respuesta || "",
        idCuestionario: pregunta.idCuestionario,
      });
      console.log("hola soy la pregunta creada:", preguntaCreada);
      // Sacamos el id de la pregunta y hacemos el bulk Create de las opciones
      const listaOpcionesPorPregunta = pregunta.opciones.map((opcion) => {
        return {
          descripcion: opcion.descripcion,
          idPregunta: preguntaCreada.id,
        };
      });
      const opcionesCreadasPorPregunta = await Opcion.bulkCreate(
        listaOpcionesPorPregunta
      );

      return res.status(201).json({
        success: true,
        msg: "Se crearon las preguntas correctamente",
      });
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Hubo un error",

      success: false,
    });
  }
};

export const mostrarTodosCuestionariosPorUsuario = async (req, res) => {
  const { idUsuarioCreador } = req.body;

  try {
    const listaCuestionarios = await db.query(
      `SELECT cuestionario.id , cuestionario.tiempoTotal,cuestionario.nomCuest,cuestionario.idUsuarioCreador,cuestionario.idCategoria ,usuario.nombre as usuarioCreador ,categoria.nombre as nombreCategoria from cuestionario  inner join categoria on categoria.id=cuestionario.idCategoria inner join usuario on usuario.id=cuestionario.idUsuarioCreador where
      cuestionario.idUsuarioCreador=${idUsuarioCreador} 
    `,
      { type: QueryTypes.SELECT }
    );

    res.status(200).json({
      cuestionarios: listaCuestionarios,
      msg: "Lista de cuestionarios",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Hubo un error",
      success: false,
    });
  }
};

export const mostrarTodosCuestionarios = async (req, res) => {
  try {
    const listaCuestionarios = await db.query(
      `SELECT cuestionario.id , cuestionario.tiempoTotal,cuestionario.nomCuest,cuestionario.idUsuarioCreador,cuestionario.idCategoria ,usuario.nombre as usuarioCreador ,categoria.nombre as nombreCategoria from cuestionario  inner join categoria on categoria.id=cuestionario.idCategoria inner join usuario on usuario.id=cuestionario.idUsuarioCreador 
    `,
      { type: QueryTypes.SELECT }
    );

    res.status(200).json({
      cuestionarios: listaCuestionarios,
      msg: "Lista de cuestionarios",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Hubo un error",
      success: false,
    });
  }
};

export const mostrarCuestionariosPorCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    const listaQuestionarios = await db.query(
      `SELECT cuestionario.id , cuestionario.tiempoTotal,cuestionario.nomCuest,cuestionario.idUsuarioCreador,cuestionario.idCategoria ,usuario.nombre as usuarioCreador ,categoria.nombre as nombreCategoria from cuestionario  inner join categoria on categoria.id=cuestionario.idCategoria inner join usuario on usuario.id=cuestionario.idUsuarioCreador${
        id ? " where cuestionario.idCategoria = " + id : ""
      }
    `,
      {
        type: db.QueryTypes.SELECT,
      }
    );
    if (listaQuestionarios.length > 0) {
      return res.status(200).json({
        cuestionarios: listaQuestionarios,
        success: true,
        msg: "Se estan mostrando los cuestionarios",
      });
    } else {
      res.status(200).json({
        cuestionarios: [],
        success: false,
        msg: "No hay cuestionarios para mostrar",
      });
    }
  } catch (err) {
    res.status(400).json({
      msg: "Ocurrio un error",
      success: false,
    });
  }
};

export const mostrarCuestionarioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const cuestionario = await db.query(
      `SELECT cuestionario.id , cuestionario.tiempoTotal,cuestionario.nomCuest,cuestionario.idUsuarioCreador,cuestionario.idCategoria ,usuario.nombre as usuarioCreador ,categoria.nombre as nombreCategoria from cuestionario  inner join categoria on categoria.id=cuestionario.idCategoria inner join usuario on usuario.id=cuestionario.idUsuarioCreador where cuestionario.id=${id}
    `,
      {
        type: db.QueryTypes.SELECT,
      }
    );
    if (cuestionario.length > 0) {
      return res.status(200).json({
        cuestionario: cuestionario[0],
        success: true,
        msg: "Se esta mostrando el cuestionario",
      });
    } else {
      res.status(200).json({
        cuestionario: {},
        success: false,
        msg: "No hay cuestionarios para mostrar",
      });
    }
  } catch (err) {
    res.status(400).json({
      msg: "Ocurrio un error",
      success: false,
    });
  }
}
