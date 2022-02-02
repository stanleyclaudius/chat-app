const router = require('express').Router()
const authCtrl = require('./../controllers/authCtrl')
const { isAuthenticated } = require('./../middlewares/auth')
const { checkDataValidity } = require('./../middlewares/checkDataValidity')

router.route('/register').post(checkDataValidity, authCtrl.register)
router.route('/activate').post(authCtrl.activateAccount)
router.route('/login').post(authCtrl.login)
router.route('/logout').post(isAuthenticated, authCtrl.logout)
router.route('/refresh_token').post(authCtrl.refreshToken)
router.route('/forget_password').post(authCtrl.forgetPassword)
router.route('/reset_password').post(authCtrl.resetPassword)
router.route('/google_login').post(authCtrl.googleLogin)
router.route('/facebook_login').post(authCtrl.facebookLogin)
router.route('/change_password').patch(isAuthenticated, authCtrl.changePassword)
router.route('/edit_profile').patch(isAuthenticated, authCtrl.editProfile)

module.exports = router