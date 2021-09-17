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

const userPost = (req, res) => {
    res.status(201).json({
        msg: 'post API'
    })
}

const userDelete = (req, res) => {
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