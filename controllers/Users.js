import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uploadImage } from "../middleware/cloudinary.js";

export const getUser = async (req, res) => {
  // Traemos un usuario de la base de datos
  try {
    const { id } = req.params;
    const usuario = await Users.findOne({
      where: {
        id,
      },
    });
    res.status(200).json({
      success: true,
      usuario,
      msg: "Se obtuvo el usuario correctamente",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: "No se pudo obtener el usuario",
    });
  }
};

export const getUsers = async (req, res) => {
  // Traemos un usuario de la base de datos
  try {
    const usuarios = await Users.findAll();
    res.status(200).json({
      success: true,
      usuarios,
      msg: "Se obtuvo el usuario correctamente",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: "No se pudo obtener el usuario",
    });
  }
}

export const Register = async (req, res) => {
  const { usuario, nombre, correo, clave } = req.body;
  const checkEmail = await Users.findOne({
    where: {
      correo: correo,
    },
  });
  if (checkEmail)
    return res.status(400).json({ msg: "El correo ya esta registrado" });
  try {
    let resultadoImg = undefined;
    let resultadoPortada = undefined;
    if (req.files?.urlImage) {
      console.log("entro a la imagen -> ");
      resultadoImg = await uploadImage(req.files.urlImage.tempFilePath);
    }
    if (req.files?.urlPortada) {
      resultadoPortada = await uploadImage(req.files.urlPortada.tempFilePath);
    }
    const salt = await bcrypt.genSalt();
    const hashClave = await bcrypt.hash(clave, salt);
    let newUser = {
      usuario: usuario,
      nombre: nombre,
      correo: correo,
      clave: hashClave,
    };
    if (resultadoImg) {
      newUser.urlImage = resultadoImg?.secure_url;
    }
    if (resultadoPortada) {
      newUser.urlPortada = resultadoPortada?.secure_url;
    }
    await Users.create(newUser);
    res
      .status(200)
      .json({ success: true, msg: "Usuario creado correctamente" });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: "No se pudo crear el usuario",
    });
  }
};

export const UpdateUser = async (req, res) => {
  // Actualizamos un usuario en la base de datos
  const { id } = req.params;
  const { usuario, nombre, correo, clave, descripcion } = req.body;
  let updateUser = {};
  try {
    let resultadoImg = undefined;
    let resultadoPortada = undefined;
    if (req.files?.urlImage) {
      resultadoImg = await uploadImage(req.files.urlImage.tempFilePath);
    }
    if (req.files?.urlPortada) {
      resultadoPortada = await uploadImage(req.files.urlPortada.tempFilePath);
    }

    if (clave === undefined || clave === null) {
      updateUser = {
        descripcion: descripcion,
        usuario: usuario,
        nombre: nombre,
        correo: correo,
      };
    } else {
      const salt = await bcrypt.genSalt();
      const hashClave = await bcrypt.hash(clave, salt);
      updateUser = {
        descripcion: descripcion,
        usuario: usuario,
        nombre: nombre,
        correo: correo,
        clave: hashClave,
      };
    }

    if (resultadoImg) {
      updateUser.urlImage = resultadoImg?.secure_url;
    }
    if (resultadoPortada) {
      updateUser.urlPortada = resultadoPortada?.secure_url;
    }
    await Users.update(updateUser, { where: { id: id } });
    res
      .status(200)
      .json({ success: true, msg: "Usuario actualizado correctamente" });
  } catch (err) {
    res.status(404).json({ msg: "No se pudo actualizar el usuario" });
  }
};

export const Login = async (req, res) => {
  // Iniciamos sesion
  try {
    const user = await Users.findAll({
      where: {
        correo: req.body.correo,
      },
    });

    // Verificamos que el usuario exista
    const match = await bcrypt.compare(req.body.clave, user[0].clave);
    if (!match)
      return res.status(400).json({ msg: "Correo o contraseña incorrectos" });

    const userId = user[0].id;
    const userName = user[0].usuario;
    const name = user[0].nombre;
    const email = user[0].correo;

    const accesToken = jwt.sign(
      { userId, userName, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s", //Tiempo de expiracion del token
      }
    );
    const refreshToken = jwt.sign(
      { userId, userName, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Guardamos el refresh token en la base de datos
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.status(200).json({ accesToken, refreshToken });
  } catch (err) {
    res.status(404).json({ msg: "Correo incorrecto" });
  }
};

export const Logout = async (req, res) => {
  // Cerramos sesion
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
