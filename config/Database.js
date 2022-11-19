import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Conexion a la base de datos
const db = new Sequelize(process.env.DB_TABLE_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
})

export default db;