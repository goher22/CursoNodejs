const {Router} = require('express')
const usercotroller = require('../controllers/user')

const router = Router()

router.get('/', usercotroller.usersGet)

router.put('/:id', usercotroller.userPut)

router.post('/', usercotroller.userPost)

router.delete('/:id', usercotroller.userDelete)

module.exports = router