const router = require('express').Router()
const userCtrl = require('./../controllers/userCtrl')
const { isAuthenticated } = require('./../middlewares/auth')

router.route('/id/:id').get(isAuthenticated, userCtrl.searchUser)
router.route('/add/:id').patch(isAuthenticated, userCtrl.addFriend)

module.exports = router