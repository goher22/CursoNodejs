const {response} = require('express')


const usersGet = (req = request, res = response) => {

    const {q, nombre = 'none', apikey} = req.query

    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey
    })
}

const userPut = (req, res = response) => {

    const id = req.params.id

    res.status(400).json({
        msg: 'put API',
        id
    })
}

const userPost = (req, res = response) => {

    const {nombre, edad} = req.body


    res.status(201).json({
        msg: 'post API - Controllador',
        nombre,
        edad
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