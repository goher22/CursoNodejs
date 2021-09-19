const Role = require('../models/role')
const Usuario = require('../models/usuarios')

const esRolValido = async(rol = '')=>{
    const existeRol = await Role.findOne({rol})
    if(!existeRol) throw new Error(`El rol ${rol} no esta registrado en la DB`)
}

const emailExiste = async(correo) =>{
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail) throw new Error(`El correo ${correo} ya esta registrado`)
}

module.exports = {
    esRolValido,
    emailExiste
}