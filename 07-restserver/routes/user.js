const {Router} = require('express')
const { check } = require('express-validator')
const usercotroller = require('../controllers/user')

const router = Router()

router.get('/', usercotroller.usersGet)

router.put('/:id', usercotroller.userPut)

router.post('/', check('correo', 'El correo no es válido').isEmail(),usercotroller.userPost)

router.delete('/:id', usercotroller.userDelete)

module.exports = router