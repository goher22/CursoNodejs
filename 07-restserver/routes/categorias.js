const {Router} = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middelwares/validar-campos')

const router = Router()

//Obtener todas las categorias - publico
router.get('/', (req, res)=>{
    res.json('get Categoria')
})

//Obtener uan categoria por id - publico
router.get('/:id', (req, res)=>{
    res.json('get Categoria por id')
})

//Crear categpria - privado  - cualquier persona con un token valido
router.post('/', (req, res)=>{
    res.json('post Categoria')
})
//Actualizar - privado -cualquera con token valido
router.put('/:id', (req, res)=>{
    res.json('put Categoria')
})

//Borrar una categoria - Admin
router.delete('/:id', (req, res)=>{
    res.json('delete Categoria')
})

module.exports = router