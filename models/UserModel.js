import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

// Definimos el modelo de la tabla usuarios
const Users = db.define('usuario',{
    usuario:{
        type: DataTypes.STRING,
    },
    nombre:{
        type: DataTypes.STRING,
    },
    correo:{
        type: DataTypes.STRING,
    },
    clave:{
        type: DataTypes.STRING,
    },
    refresh_token:{
        type: DataTypes.TEXT,
    }
},{
    tableName: 'usuario'
})

export default Users
