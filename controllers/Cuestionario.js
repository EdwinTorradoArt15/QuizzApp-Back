import Categoria from "../models/CategoriaModel.js";
import Cuestionario from "../models/CuestionarioModel.js";
import Pregunta from "../models/PreguntasModel.js";
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
        const cuestionarioCreado = await Cuestionario.create({
          idCategoria,
          tiempoTotal,
          idUsuarioCreador,
          nomCuest,
        });

        res.status(201).json({
          msg: "Se creo el cuestionario exitosamente",
          cuestionario: cuestionarioCreado,
          success: true,
        });
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

export const registrarPreguntas = async (req, res) => {
  const data = req.body;

  const listaPreguntas = data.preguntas;

  try {
    //Creamos la pregunta

    const preguntaCreadas = await Pregunta.bulkCreate(listaPreguntas);

    return res.status(201).json({
      success: true,
      msg: "Se crearon las preguntas correctamente",
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Hubo un error",
      pregunta: listaPreguntas[0],
      success: false,
    });
  }

  /* {

  idCuestionario:1,
  preguntas:[{
    idCuestionario:1,
    descripcion:nombre,
    respuesta:opcionRespuesta,
    opciones:[
      {
        idPregunta,
        descripcion
      }
    ]

  }]

} */
};

export const mostrarTodosCuestionarios = async (req, res) => {
  try {
    const listaCuestionarios = await Cuestionario.findAll();
    res.status(200).json({
      cuestionarios: listaCuestionarios,
      msg: "Lista de cuestionarios",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Hubo un error",
      success: false,
    });
  }
};
