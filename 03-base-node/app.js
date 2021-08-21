const {creararchivo} = require('./helpers/multiplicar')
console.clear()
const base = 4
creararchivo(base)
    .then(nombreArchivo=> console.log(nombreArchivo, 'creado'))
    .catch(err => console.log(err))

