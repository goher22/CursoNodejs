const { response, json } = require("express");
const Usuario = require('../models/usuarios')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-JWT");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {

    const {correo, password} = req.body

    try{
        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo})
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        //Si el usuario esta activo
        if (!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        //Verificar la contraseña
        const validaPassword = bcryptjs.compareSync(password, usuario.password)

        if(!validaPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id)


        res.json({
            usuario,
            token
        })

    }catch(error){
        console.log(error)
        res.status(500).json({msg: "Hable con el adminstrador"})
    }

}

const googleSignIn = async (req, res= response) => {

    const {id_token} = req.body

    try {

        const {correo, nombre, img} = await googleVerify(id_token)

        let usuario = await Usuario.findOne({correo})

        if(!usuario){
            //Crear nuevo usuario
            usuario = new Usuario({nombre, correo, password: ':P', img, google: true, rol: 'USER_ROLE'})
            await usuario.save()

        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el adminstrador, usuario bloquedo'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id)


        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'El Token no se pudo verificar'
        })
    }

}

module.exports = {
    login,
    googleSignIn
}