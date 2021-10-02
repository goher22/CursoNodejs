const path = require('path')
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject)=>{

        const {archivo} = files
        const nombreContro = archivo.name.split('.')
        const extension = nombreContro[nombreContro.length-1]
    
        //validar la extenciones
        if(!extensionValidas.includes(extension))
            return reject(`La extención ${ extension } no es permitida, ${extensionValidas}`)

        const nombreTemp = uuidv4()+'.'+extension
        const uploadPath = path.join(__dirname,'../uploads/', carpeta,nombreTemp);
      
        archivo.mv(uploadPath, (err) => {
            if (err)
                reject(err)
            resolve(nombreTemp)
        });

    })

}

module.exports = {subirArchivo}
