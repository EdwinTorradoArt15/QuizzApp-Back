import { QueryTypes } from "sequelize";
import db from "../config/Database.js";
import Categoria from "../models/CategoriaModel.js";
import Cuestionario from "../models/CuestionarioModel.js";
import Opcion from "../models/OpcionesModel.js";
import Pregunta from "../models/PreguntasModel.js";
import Users from "../models/UserModel.js";
export const mostrarPreguntasPorCuestionario = async (req, res) => {
  // Id del cuestionairo y el id del usuario
  const data = req.body;
  console.log("Data que te envio:", data);
  try {
    const preguntas = await db.query(
      `SELECT u.id as id_usuario ,c.id as id_cuestionario,p.id as id_pregunta,c.nomCuest,p.descripcion as pregunta_descripcion FROM
      usuario u INNER join cuestionario c on u.id=c.idUsuarioCreador inner JOIN preguntas p on c.id=p.idCuestionario
      where c.id=${data.idCuestionario} 
      `,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (preguntas.length > 0) {
      return res.status(200).json({
        preguntas: preguntas,
        success: true,
        msg: "Se esta mostrando la pregunta",
      });
    } else {
      res.status(200).json({
        preguntas: [],
        success: false,
        msg: "No hay preguntas para mostrar",
      });
    }
  } catch (err) {
    res.status(400).json({
      msg: "Ocurrio un error",
      success: false,
    });
  }
};

export const mostrarOpcionesPorPregunta = async (req, res) => {
  // Necesitamos el id de la pregunta y con eso mostramos las opciones
  const data = req.body;

  try {
    const opciones = await db.query(
      `SELECT o.descripcion,o.id as opcion_id from opciones o inner JOIN preguntas p on o.idPregunta=p.id inner join cuestionario c on c.id=p.idCuestionario where 
          p.id=${data.idPregunta} and c.id=${data.idCuestionario}
          `,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (opciones.length > 0) {
      return res.status(200).json({
        opciones: opciones,
        success: true,
        msg: "Se esta mostrando las opciones",
      });
    } else {
      res.status(200).json({
        opciones: [],
        success: false,
        msg: "No hay opciones para mostrar",
      });
    }
  } catch (err) {
    res.status(400).json({
      msg: "Ocurrio un error",
      success: false,
    });
  }
};
