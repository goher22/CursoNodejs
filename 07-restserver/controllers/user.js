const {response} = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuarios')


const usersGet = async (req = request, res = response) => {

    //const {q, nombre = 'none', apikey} = req.query
    const {limite = 5, desde = 0} = req.query
    const usuarios = await Usuario.find()
        .skip(Number(desde))
        .limit(Number(limite))

    res.json({usuarios})
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

const userDelete = (req, res = response) => {

    const id = req.params.id

    res.json({
        msg: 'delete API',
        id
    })
}

module.exports = {
    usersGet,
    userPut,
    userPost,
    userDelete
}