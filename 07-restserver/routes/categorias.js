const { Router } = require('express')
const { check } = require('express-validator')
const { crearCategoria, obtenerCategoria, obtenerCategorias, actualizarCategoria, borrarCategoria } = require('../controllers/categorias')
const { existeCategoriaPorId } = require('../helpers/db-validators')
const { validarJWT, validarCampos, tieneRole } = require('../middelwares')

const router = Router()

//Obtener todas las categorias - publico
router.get('/', obtenerCategorias)

//Obtener uan categoria por id - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria)

//Crear categpria - privado  - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)
//Actualizar - privado -cualquera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],actualizarCategoria)

//Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],borrarCategoria)

module.exports = router