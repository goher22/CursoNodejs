const { describe } = require('yargs')

const argv = require('yargs').option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'Es la base de la tabla de multiplar'
})
.option('l', {
    alias: 'listar',
    type: 'boolean',
    default: false,
    describe: "mustra la tabla de multiplicar"
})
.check((argv, option)=>{
    if( isNaN( argv.b ) ) throw 'La base tiene que ser un número'
    return true
})
.argv

module.exports = argv