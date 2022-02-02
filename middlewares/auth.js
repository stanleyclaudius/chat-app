const User = require('./../models/User')
const jwt = require('jsonwebtoken')

module.exports.isAuthenticated = async(req, res, next) => {
  try {
    const token = req.header('Authorization')
    if (!token)
      return res.status(400).json({msg: 'Invalid token.'})

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    if (!decoded.id)
      return res.status(400).json({msg: 'Invalid token.'})

    const user = await User.findOne({_id: decoded.id})
    if (!user)
      return res.status(404).json({msg: 'User not found.'})

    req.user = user
    next()
  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
}