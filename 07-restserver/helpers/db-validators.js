const { Categoria, Role, Usuario } = require('../models')

const esRolValido = async(rol = '')=>{
    const existeRol = await Role.findOne({rol})
    if(!existeRol) throw new Error(`El rol ${rol} no esta registrado en la DB`)
}

const emailExiste = async(correo) =>{
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail) throw new Error(`El correo ${correo} ya esta registrado`)
}

const existeUsuarioPorId = async(id) =>{
    const existeUsuario = await Usuario.findById(id)
    if(!existeUsuario) throw new Error(`El id ${id} no existe`)
}

const existeCategoriaPorId = async(id) => {
    console.log(id)
    try {
        const existeCategoria = await Categoria.findById(id)
    } catch (error) {
        console.log(error)
    }
    
    /*try {
        const existeCategoria = await Categoria.findById(id)
        if(!existeCategoria) console.log("Hoal que tal")
        if(!existeCategoria) throw new Error(`El id ${id} no existe`)   
    } catch (error) {
        
    }*/
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId
}