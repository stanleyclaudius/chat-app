const router = require('express').Router()
const authCtrl = require('./../controllers/authCtrl')
const { checkDataValidity } = require('./../middlewares/checkDataValidity')

router.route('/register').post(checkDataValidity, authCtrl.register)
router.route('/activate').post(authCtrl.activateAccount)
router.route('/login').post(authCtrl.login)

module.exports = router