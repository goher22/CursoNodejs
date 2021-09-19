const {Router} = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middelwares/validar-campos')
const authController = require('../controllers/auth')

const router = Router()

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],authController.login)

router.post('/google', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
],authController.googleSignIn)

module.exports = router