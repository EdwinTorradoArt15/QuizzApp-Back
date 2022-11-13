import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

/* id	descripcion	respuesta	valor	idCuestionario */
const Pregunta = db.define(
  "preguntas",
  {
    descripcion: {
      type: DataTypes.STRING,
    },
    respuesta: {
      type: DataTypes.STRING,
    },

    idCuestionario: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "preguntas",
  }
);

export default Pregunta;
