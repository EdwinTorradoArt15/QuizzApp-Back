import { DataTypes } from "sequelize";
import db from "../config/Database.js";

 const Categoria = db.define('categoria', {
    // Model attributes are defined here
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING
    }/* ,
    imagen: {
      type: DataTypes.STRING
    } */
  }, {
    // Other model options go here
  });
  

  export default Categoria