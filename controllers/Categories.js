import Categoria from "../models/CategoriaModel.js";
import { uploadImage } from "../middleware/cloudinary.js";

export const registarCategoria = async (req, res) => {
  console.log("Intentas pasar aunque sea");
  const { nombre, descripcion } = req.body;
  console.log("req files : " , req.files);
  console.log(nombre, descripcion);
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
      if(req.files?.image){
        resultadoImg = await uploadImage(req.files.image.tempFilePath)
      }
      if(resultadoImg){
        await Categoria.create({
          nombre,
          descripcion,
          urlImage : resultadoImg?.secure_url,
        });
        return res
        .status(201)
        .json({ msg: "Categoria creada correctamente", success: true });
      }else{
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
