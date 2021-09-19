const { response, request } = require("express")
const {Categoria} = require('../models')

const obtenerCategorias = async (req = request, res = response) => {
    const {limite = 5, desde= 0} = req.query

    const [total, categoria] = await Promise.all([
        Categoria.countDocuments({estado:true}),
        Categoria.find({estado:true})
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
    ])

    res.json({
        total,
        categoria
    })

}

const obtenerCategoria = async (req = request, res = response) =>{
    const {id} = req.params
    const categoria = await Categoria.findById(id)
        .populate('usuario', 'nombre')
    res.json(categoria)
}

const crearCategoria = async(req, res=response) => {

    const nombre = req.body.nombre.toUpperCase()
    const categoriaDB = await Categoria.findOne({nombre})

    if(categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        })
    }
    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data)

    //Guardar DB
    await categoria.save()
    res.status(201).json(categoria)

}

//actualizarCategoria

//borrarCategoria - estado:false

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
}
