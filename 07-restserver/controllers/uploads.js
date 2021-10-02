const { response } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivo = async (req, res =response) =>{
  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).json('No hay archivo que subir');
      return;
    }

    try {
      //Imagenes
     // const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos')
     //const nombre = await subirArchivo(req.files, undefined, 'img')
     const nombre = await subirArchivo(req.files)

      res.json({
        nombre
      })

    } catch (msg) {

      res.status(400).json({msg})
      
    }

}

const actualizarImagen = (req, res = response) => {

  const {id, coleccion} = req.params

  res.json({ id, coleccion })

  response.json
}

module.exports = {
    cargarArchivo,
    actualizarImagen
}