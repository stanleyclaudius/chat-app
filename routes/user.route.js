const router = require('express').Router()
const userCtrl = require('./../controllers/userCtrl')
const { isAuthenticated } = require('./../middlewares/auth')

router.route('/id/:id').get(isAuthenticated, userCtrl.searchUser)
router.route('/add/:id').patch(isAuthenticated, userCtrl.addFriend)
router.route('/search').get(isAuthenticated, userCtrl.searchFriend)

module.exports = router