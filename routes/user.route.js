const router = require('express').Router()
const userCtrl = require('./../controllers/userCtrl')
const { isAuthenticated } = require('./../middlewares/auth')

router.route('/id/:id').get(isAuthenticated, userCtrl.searchUser)

module.exports = router