const {response} = require('express')

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

const userPost = (req, res = response) => {

    const body = req.body
    const usuario = new Usuario(body)
    usuario.save()
    res.status(201).json({
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