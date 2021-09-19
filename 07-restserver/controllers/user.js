const {response} = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuarios')


const usersGet = async (req = request, res = response) => {

    //const {q, nombre = 'none', apikey} = req.query
    const {limite = 5, desde = 0} = req.query
    // const usuarios = await Usuario.find({estado:true})
    //     .skip(Number(desde))
    //     .limit(Number(limite))

    //const total = await Usuario.countDocuments({estado:true})

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true}).skip(Number(desde)).limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}

const userPut = async (req, res = response) => {

    const {id} = req.params

    const {_id, password, google, correo, ...resto} = req.body

    //TODO: validar contra la base de dato
    if(password){
        //Encripta la contraseña
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuario)
}

const userPost = async (req, res = response) => {

    const {nombre, correo, password, rol} = req.body
    const usuario = new Usuario({nombre, correo, password, rol})

    //Encripta la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    //Guardat en la BD    
    await usuario.save()

    res.json(usuario)
}

const userDelete = async (req, res = response) => {

    const {id} = req.params

    const uid = req.uid

    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id)
    
    //
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})


    res.json({
        usuario
    })
}

module.exports = {
    usersGet,
    userPut,
    userPost,
    userDelete
}