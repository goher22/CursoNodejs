const { response } = require("express")
const { isValidObjectId } = require("mongoose")
const { Usuario } = require("../models")

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuario = async(termino = '', res = response) => {

    const esMongoID = isValidObjectId(termino)

    if(esMongoID) {
        console.log('hola')
        const usuario = await Usuario.findById(termino)
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, 'i')

    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    })

    res.json({
        resresults: usuarios
    })

}

const buscar = async (req, res = response) => {

    const {coleccion, termino} = req.params

    if(!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch(coleccion) {
        case 'usuarios':
            await buscarUsuario(termino, res)
            break;
        case 'categorias':
            break;
        case 'productos':
            break;
        case 'role':
            break;
        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
    }
}

module.exports = {
    buscar
}