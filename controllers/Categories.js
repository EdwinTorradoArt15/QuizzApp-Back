import Categoria from "../models/CategoriaModel.js";
import Cuestionario from "../models/CuestionarioModel.js";
import db from "../config/Database.js";
import { uploadImage } from "../middleware/cloudinary.js";

export const registarCategoria = async (req, res) => {
  const { nombre, descripcion } = req.body;
  if (nombre !== undefined && descripcion !== undefined) {
    const categoriaExiste = await Categoria.findOne({
      where: {
        nombre: nombre,
      },
    });

    if (categoriaExiste) {
      return res.status(400).json({
        msg: "Ya esta registrada la categoria  ya esta registrado",
        success: false,
      });
    }

    try {
      let resultadoImg = undefined;
      if (req.files?.image) {
        resultadoImg = await uploadImage(req.files.image.tempFilePath)
      }
      if (resultadoImg) {
        await Categoria.create({
          nombre,
          descripcion,
          urlImage: resultadoImg?.secure_url,
        });
        return res
          .status(201)
          .json({ msg: "Categoria creada correctamente", success: true });
      } else {
        return res.status(400).json({ msg: "No se pudo crear la categoria, falta imagen", success: false });
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    res.status(400).json({
      success: false,
      msg: "Faltan datos",
    });
  }
};

export const mostrarCategorias = async (req, res) => {
  try {
    const listaCategorias = await Categoria.findAll();
    if (listaCategorias !== undefined) {
      return res.status(200).json({
        categorias: listaCategorias,
        success: true,
        msg: "Se estan mostrando las categorais",
      });
    } else {
      return res.status(204).json({
        categorias: [],
        success: false,
        msg: "No hay categorias para mostrar",
      });
    }
  } catch (error) {
    console.error(err);
  }
};

/**
  *TODO: Crear funcionalidad de editar categoria
 */

export const getCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findByPk(id);
    if (categoria) {
      return res.status(200).json({
        categoria,
        success: true,
        msg: "Se encontro la categoria",
      });
    } else {
      return res.status(400).json({
        msg: "No se encontro la categoria",
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export const deleteCategoria = async (req,res) => {
  const {id} = req.params
  try {
    const categoria = await Categoria.findByPk(id)
    if(categoria){
      await categoria.destroy()
      return res.status(200).json({
        msg: "Categoria eliminada correctamente",
        success: true
      })
    }else{
      return res.status(400).json({
        msg: "No se encontro la categoria",
        success: false
      })
    }
  } catch (err) {
    console.log(err)
  }
}



export const mostrarCuestionariosPorCategoria = async (req, res) => {
  const { id } = req.params
  try {
    const listaQuestionarios = await db.query(
      `SELECT cuestionario.id , cuestionario.tiempoTotal,cuestionario.nomCuest,cuestionario.idUsuarioCreador,cuestionario.idCategoria ,usuario.nombre as usuarioCreador ,categoria.nombre as nombreCategoria from cuestionario  inner join categoria on categoria.id=cuestionario.idCategoria inner join usuario on usuario.id=cuestionario.idUsuarioCreador${id ? ' where cuestionario.idCategoria = ' + id : ''}
    `, {
      type: db.QueryTypes.SELECT
    }
    )
    if (listaQuestionarios.length > 0) {
      return res.status(200).json({
        cuestionarios: listaQuestionarios,
        success: true,
        msg: "Se estan mostrando los cuestionarios"
      })
    } else {
        res.status(200).json({
        cuestionarios: [],
        success: false,
        msg: "No hay cuestionarios para mostrar"
      })
    }
  } catch (err) {
    console.log(err)
  }
}
