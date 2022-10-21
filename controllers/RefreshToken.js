import Users from "../models/UserModel.js";
import jwt from 'jsonwebtoken'

export const refreshToken = async (req, res) => {
    // Obtenemos el refresh token del usuario
    try {
        const refreshToken = req.body.refreshToken
        if(!refreshToken) return res.sendStatus(401);
        const user = await Users.findAll({
            where:{
                refresh_token: refreshToken
            }
        })
        
        // Verificamos que el refresh token exista
        // Si no existe, el usuario no esta logueado
        // Si existe, verificamos que el refresh token sea valido
        if(!user[0]) return res.sendStatus(403)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const userName = user[0].usuario;
            const name = user[0].nombre;
            const email = user[0].correo; 
            const accesToken = jwt.sign({userId,userName,name,email}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            })
            res.json({accesToken})
        })
    } catch (error) {
        console.log(error)
    }
}