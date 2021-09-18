const {response} = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuarios')


const usersGet = (req = request, res = response) => {

    const {q, nombre = 'none', apikey} = req.query

    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey
    })
}

const userPut = async (req, res = response) => {

    const id = req.params.id

    res.status(400).json({
        msg: 'put API',
        id
    })
}

const userPost = async (req, res = response) => {

    const {nombre, correo, password, rol} = req.body
    const usuario = new Usuario({nombre, correo, password, rol})

    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail) 
        return res.status(400).json({
            msg: 'El correo ya esta registrado'
        })

    //Encripta la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    //Guardat en la BD    
    await usuario.save()

    res.json({
        usuario
    })
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