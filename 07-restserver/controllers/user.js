const {response} = require('express')


const usersGet = (req, res = response) => {
    res.json({
        msg: 'get API - Controlador'
    })
}

const userPut = (req, res = response) => {
    res.status(400).json({
        msg: 'put API'
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
    res.json({
        msg: 'delete API'
    })
}

module.exports = {
    usersGet,
    userPut,
    userPost,
    userDelete
}