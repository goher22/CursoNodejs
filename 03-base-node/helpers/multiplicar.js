const fs = require('fs')
const creararchivo = async (base = 5, listar) => {
    try{
      console.log("=========================")
      console.log(`       TABLA DEL`, base)
      console.log("=========================")
      
      let salida = ''
      for(let i = 1; i <= 10; i++){
        salida += `${base}X${i}=${base*i}\n`
      }
      if(listar) console.log(salida)
      
      fs.writeFileSync(`./salida/tabla-${base}.txt`, salida)
      
      return `tabla-${base}.txt creado`
    }catch(err){
      throw err
    }
}

module.exports = {creararchivo}