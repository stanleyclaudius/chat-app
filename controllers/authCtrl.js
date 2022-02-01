const User = require('./../models/User')
const bcrypt = require('bcrypt')
const sendMail = require('./../utils/sendMail')
const { generateActivationToken } = require('./../utils/generateToken')

const authCtrl = {
  register: async(req, res) => {
    try {
      const { name, email, password } = req.body
      
      const findEmail = await User.findOne({email})
      if (findEmail)
        return res.status(400).json({msg: 'Email has been used before.'})

      const passwordHash = await bcrypt.hash(password, 12)

      const newUser = { name, email, password: passwordHash }
      
      const activationToken = generateActivationToken(newUser)

      const url = `${process.env.CLIENT_URL}/activate/${activationToken}`
      sendMail(email, url, 'Account Activation')

      return res.status(200).json({msg: 'Email activation link has been sent to your email.'})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

module.exports = authCtrl