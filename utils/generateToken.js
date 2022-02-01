const jwt = require('jsonwebtoken')

module.exports.generateActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '30m'})
}