const { alias } = require('yargs')
const {creararchivo} = require('./helpers/multiplicar')
const argv = require('yargs').option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true
})
.option('l', {
    alias: 'listar',
    type: 'boolean',
    default: false
})
.check((argv, option)=>{
    if( isNaN( argv.b ) ) throw 'La base tiene que ser un número'
    return true
})
.argv
console.clear()

//console.log(process.argv)
//console.log(argv)

// const [,,arg3 = 'base=5'] = process.argv
// const [,base = 5] = arg3.split('=')

creararchivo(argv.base, argv.l)
    .then(nombreArchivo=> console.log(nombreArchivo, 'creado'))
    .catch(err => console.log(err))

