const path = require('path')
const { response } = require("express");

const cargarArchivo = (req, res =response) =>{
  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).json('No hay archivo que subir');
      return;
    }

    const {archivo} = req.files
  
    const nombreContro = archivo.name.split('.')
    const extension = nombreContro[nombreContro.length-1]

    //validar la extenciones
    const extensionValidas = ['png', 'jpg', 'jpeg', 'gif']
    if(!extensionValidas.includes(extension))
      return res.status(400).json({
        msg: `La extención ${ extension } no es permitida, ${extensionValidas}`
      })

    const uploadPath = path.join(__dirname,'../uploads/', archivo.name);
  
    archivo.mv(uploadPath, (err) => {
      if (err) {
        console.log(err)
        return res.status(500).json({err});
      }
  
      res.json({msg: 'File uploaded to ' + uploadPath});
    });

}

module.exports = {
    cargarArchivo
}