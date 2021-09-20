const { response, request } = require("express")
const jwt = require("jsonwebtoken")
const Usuarios = require("../models/usuarios")

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try{

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        //leer el usuario que corresponde al uid
        const usuario = await Usuarios.findById(uid)
        
        // Usuario no existe en la base de dato
        if(!usuario){
            return res.status(401).json({
                msg: 'token no válido - Usuario no existe en DB'
            })            
        }

        // Verificar si el uid tiene estado true
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'token no válido - Usuario con estado false'
            })
        }

        req.usuario = usuario
        next()
    }catch(err){
        res.status(401).json({
            msg: 'token no válido'
        })
    }

}


module.exports = {
    validarJWT
}

