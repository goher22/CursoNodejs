const { request, response } = require("express")
const { Producto, Categoria } = require("../models")

const obtenerProductos = async (req = request, res= response) => {

    const {limite = 5, desde= 0} = req.query

    const [total, productos] = await Promise.all([
        Producto.countDocuments({estado:true}),
        Producto.find({estado:true})
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ])

    res.json({
        total,
        productos
    })
}

const obtenerProducto = async (req =request, res = response) => {
    const {id} = req.params
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
    res.json(producto)
}

const crearProducto = async(req, res = response) => {

    
    const {nombre, precio, decripcion, categoria} = req.body
    const nombreP = nombre.toUpperCase()

    const productoDB = await Producto.findOne({nombre: nombreP})
    

    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        })
    }

    
    const data = {
        nombre: nombreP,
        precio,
        decripcion,
        categoria,
        usuario: req.usuario._id
    }

    const producto = new Producto(data)
    
    await producto.save()
    res.status(201).json(producto)

}

const actualizarProduto = async(req, res=response)=>{

    const {id} = req.params

    const {_id, estatus, ...data} = req.body

    data.nombre = req.body.nombre.toUpperCase()
    data.usuario = req.usuario._id

    const productoDB = await Producto.findOne({nombre: data.nombre})
    

    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        })
    }

    const producto = await Producto.findByIdAndUpdate(id, data, {new:true})
    res.json(producto)

}

const borrarProducto = async (req, res = response) => {
    const {id} = req.params
    const producto = await Producto.findByIdAndUpdate(id, {estado: false})
    res.json(producto)
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProduto,
    borrarProducto
}