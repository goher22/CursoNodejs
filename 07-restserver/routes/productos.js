const { Router } = require('express')
const { check } = require('express-validator')
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProduto, borrarProducto } = require('../controllers/produtos')
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators')
const { validarJWT, validarCampos } = require('../middelwares')

const router = Router()

router.get('/', obtenerProductos)

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto)

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'El id de la categoria es obligatorio').not().isEmpty(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],crearProducto)

router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'El id de la categoria es obligatorio').not().isEmpty(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],actualizarProduto)

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],borrarProducto)

module.exports = router