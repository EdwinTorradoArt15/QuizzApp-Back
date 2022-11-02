import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import db from './config/Database.js';
import router from './routes/index.js';
import fileUpload from 'express-fileupload';

dotenv.config()
// Inicializamos express
const app = express();

// Conectamos a la base de datos
try{
    await db.authenticate();
    console.log('Base de datos conectada');
}catch(err){
    console.error(err);
}

// Middlewares
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser())
app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));
app.use(router);

// Iniciamos el servidor
app.listen(5000, () => {
    console.log('Servidor corriendo por el puerto 5000')
})