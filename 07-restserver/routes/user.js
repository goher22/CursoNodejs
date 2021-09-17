const {Router} = require('express')
const usercotroller = require('../controllers/user')

const router = Router()

router.get('/', usercotroller.usersGet)

router.put('/', usercotroller.userPut)

router.post('/', usercotroller.userPost)

router.delete('/', usercotroller.userDelete)

module.exports = router