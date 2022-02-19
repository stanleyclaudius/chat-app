const router = require('express').Router()
const messageCtrl = require('./../controllers/messageCtrl')
const { isAuthenticated } = require('./../middlewares/auth')

router.route('/').post(isAuthenticated, messageCtrl.createMessage)
router.route('/conversation').get(isAuthenticated, messageCtrl.getConversation)

router.route('/:id').get(isAuthenticated, messageCtrl.getMessage)
router.route('/update/:id').patch(isAuthenticated, messageCtrl.udpateReadStatus)

module.exports = router