import Categoria from "../models/CategoriaModel.js";
import Cuestionario from "../models/CuestionarioModel.js";
import Users from "../models/UserModel.js";
/* idCategoria:{
    type: DataTypes.INTEGER,
},
tiempoTotal:{
    type: DataTypes.INTEGER,
},
idUsuarioCreador:{
    type: DataTypes.INTEGER,
  
},
nomCuest:{
    type: DataTypes.STRING,
}, */

export const registrarCuestionario = async (req, res) => {
  const { idCategoria, tiempoTotal, idUsuarioCreador, nomCuest } = req.body;

  if (idCategoria && tiempoTotal && idUsuarioCreador && nomCuest) {
    try {
      const categoriaBuscada = await Categoria.findOne({
        where: {
          id: idCategoria,
        },
      });

      const usuarioBuscado = await Users.findOne({
        where: {
          id: idUsuarioCreador,
        },
      });
      if (categoriaBuscada && usuarioBuscado) {
        await Cuestionario.create({
          idCategoria,
          tiempoTotal,
          idUsuarioCreador,
          nomCuest,
        });

        res.status(201).json({
            msg:"Se creo el cuestionario exitosamente",
            success:true
        })
      } else {
        res.status(400).json({
          success: false,
          msg: "No existe la categoria o el usuario escojido",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    res.status(400).json({
      success: false,
      msg: "Faltan datos",
    });
  }
};
