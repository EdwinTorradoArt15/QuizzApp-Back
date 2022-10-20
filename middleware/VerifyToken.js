import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    // Obtenemos el token del header
    const authHeader = req.headers['authorization'];
    // Verificamos que el token exista
    const token = authHeader && authHeader.split(' ')[1];

    // Si no existe, el usuario no esta logueado
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,decoded) => {
        if(err) return res.sendStatus(403);
        req.correo = decoded.correo;
        next();
    })
}