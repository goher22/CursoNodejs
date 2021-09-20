const { response } = require("express")
const { isValidObjectId } = require("mongoose")
const { Usuario, Categoria, Producto } = require("../models")

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuario = async(termino = '', res = response) => {

    const esMongoID = isValidObjectId(termino)

    if(esMongoID) {
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
const buscarCategoria = async(termino = '', res = response) => {

    const esMongoID = isValidObjectId(termino)

    if(esMongoID) {
        const categoria = await Categoria.findById(termino)
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regex = new RegExp(termino, 'i')

    const categorias = await categorias.find({nombre: regex, estado: true})

    res.json({
        resresults: categorias
    })
}
const buscarProducto = async(termino = '', res = response) => {

    const esMongoID = isValidObjectId(termino)

    if(esMongoID) {
        const producto = await Producto.findById(termino)
            .populate('categoria', 'nombre')
        return res.json({
            results: (producto) ? [producto] : []
        })
    }

    const regex = new RegExp(termino, 'i')

    const productos = await Producto.find({nombre: regex, estado: true})
        .populate('categoria', 'nombre')

    res.json({
        resresults: productos
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
            await buscarCategoria(termino, res)
            break;
        case 'productos':
            await buscarProducto(termino, res)
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