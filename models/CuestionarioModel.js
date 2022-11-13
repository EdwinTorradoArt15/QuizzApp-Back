import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

/* id Primaria	int(11)			No	Ninguna		AUTO_INCREMENT	Cambiar Cambiar	Eliminar Eliminar	
Más Más
	2	idCategoria Índice	int(11)			No	Ninguna			Cambiar Cambiar	Eliminar Eliminar	
Más Más
	3	tiempoTotal	int(11)			No	Ninguna			Cambiar Cambiar	Eliminar Eliminar	
Más Más
	4	idUsuarioCreador Índice	int(11)			No	Ninguna			Cambiar Cambiar	Eliminar Eliminar	
Más Más
	5	nomCuest */

// Definimos el modelo de la tabla usuarios
const Cuestionario = db.define(
  "cuestionario",
  {
    idCategoria: {
      type: DataTypes.INTEGER,
    },
    tiempoTotal: {
      type: DataTypes.INTEGER,
    },
    idUsuarioCreador: {
      type: DataTypes.INTEGER,
    },
    nomCuest: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "cuestionario",
  }
);

export default Cuestionario;
