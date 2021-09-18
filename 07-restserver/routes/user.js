const {Router} = require('express')
const { check } = require('express-validator')
const usercotroller = require('../controllers/user')
const { esRolValido } = require('../helpers/db-validators')
const { validarCampos } = require('../middelwares/validar-campos')

const router = Router()

router.get('/', usercotroller.usersGet)

router.put('/:id', usercotroller.userPut)

router.post('/', [
    check('nombre', 'El nombre no es válido').not().isEmpty(),
    check('password', 'El password no es válido').isLength({min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
],usercotroller.userPost)

router.delete('/:id', usercotroller.userDelete)

module.exports = router