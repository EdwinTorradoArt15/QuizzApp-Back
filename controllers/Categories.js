import Categoria from "../models/CategoriaModel.js";

export const registarCategoria = async (req, res) => {
  console.log("Intentas pasar aunque sea");
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
      await Categoria.create({
        nombre,
        descripcion,
      });
      return res
        .status(201)
        .json({ msg: "Categoria creada correctamente", success: true });
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

export const eliminarCategorias = async (req, res) => {};

export const editarCategorias = async (req, res) => {};

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
