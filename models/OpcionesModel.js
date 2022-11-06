import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

/* id	descripcion	respuesta	valor	idCuestionario */
const Opcion = db.define(
  "opciones",
  {
    descripcion: {
      type: DataTypes.STRING,
    },
    idPregunta: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "opciones",
  }
);

export default Cuestionario;
