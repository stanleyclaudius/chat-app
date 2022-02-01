const router = require('express').Router()
const authCtrl = require('./../controllers/authCtrl')
const { checkDataValidity } = require('./../middlewares/checkDataValidity')

router.route('/register').post(checkDataValidity, authCtrl.register)

module.exports = router