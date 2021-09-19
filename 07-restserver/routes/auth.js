const {Router} = require('express')
const { check } = require('express-validator')

const authController = require('../controllers/auth')
const { validarCampos } = require('../middelwares/validar-campos')

const router = Router()

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],authController.login)

module.exports = router