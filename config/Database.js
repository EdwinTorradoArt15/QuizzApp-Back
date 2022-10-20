import { Sequelize } from "sequelize";

// Conexion a la base de datos
const db = new Sequelize('quizapp', 'artdev', 'desarrollo2022*',{
    host: '47.89.245.144',
    dialect: 'mysql',
})

export default db;