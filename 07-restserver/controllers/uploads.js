const path = require('path')
const fs = require('fs')

const { response } = require("express");
const { subirArchivo } = require("../helpers");

const { Usuario, Producto } = require("../models");

const cargarArchivo = async (req, res =response) =>{

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

const actualizarImagen = async (req, res = response) => {

  const {id, coleccion} = req.params

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id)
      if(!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        })
      }
      break;
    case 'productos':
      modelo = await Producto.findById(id)
      if(!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`
        })
      }
      break;
    
    default:
      return res.status(500).json({msg: 'Se me olvido validar esto'})
  }

  try {

    //Limpiar imagenes previas
    if(modelo.img){
      
      // Hay que borrar la imgane del servidor 
      const payhImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
      if(fs.existsSync(payhImagen)) {
        fs.unlinkSync(payhImagen)
      }

    }

    const nombre = await subirArchivo(req.files, undefined, coleccion)
    modelo.img = nombre

    await modelo.save();

    res.json(modelo)
  } catch (msg) {
    console.log(msg)
    res.status(400).json({msg})    
  }

}

const mostrarImagen = async (req, res = response) =>{

  const {id, coleccion} = req.params

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id)
      if(!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        })
      }
      break;
    case 'productos':
      modelo = await Producto.findById(id)
      if(!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`
        })
      }
      break;
    
    default:
      return res.status(500).json({msg: 'Se me olvido validar esto'})
  }

  try {

    //Limpiar imagenes previas
    if(modelo.img){
      
      // Hay que borrar la imgane del servidor 
      const payhImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
      if(fs.existsSync(payhImagen)) {
        return res.sendFile(payhImagen)
      }

    }

    const payhImagen = path.join(__dirname, '../assets', 'no-image.png')
    res.sendFile(payhImagen)

  } catch (msg) {
    console.log(msg)
    res.status(400).json({msg})    
  }

}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}