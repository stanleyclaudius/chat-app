const User = require('./../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const sendMail = require('./../utils/sendMail')
const { generateActivationToken, generateAccessToken, generateRefreshToken } = require('./../utils/generateToken')

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
  },
  activateAccount: async(req, res) => {
    try {
      const { token } = req.body
      if (!token)
        return res.status(400).json({msg: 'Invalid account activation token.'})

      const decoded = jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET)
      if (!decoded)
        return res.status(400).json({msg: 'Invalid account activation token.'})

      const user = await User.findOne({email: decoded.email})
      if (user)
        return res.status(400).json({msg: `Email has been used before.`})

      const newUser = new User(decoded)
      await newUser.save()

      newUser.userId = newUser._id
      await newUser.save()

      return res.status(200).json({msg: 'Account has been activated successfully.'})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  login: async(req, res) => {
    try {
      const { email, password } = req.body

      if (!email)
        return res.status(400).json({msg: 'Please provide your email.'})

      if (!password)
        return res.status(400).json({msg: 'Please provide your password.'})

      const user = await User.findOne({email})
      if (!user)
        return res.status(404).json({msg: 'Invalid credential.'})

      loginUser(user, password, res)
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

const loginUser = async(user, password, res) => {
  const isPwMatch = await bcrypt.compare(password, user.password)
  let msg = ''

  if (user.type === 'register')
    msg = 'Invalid credential.'
  else
    msg = `This account login using ${user.type}`
    
  if (!isPwMatch)
    return res.status(400).json({msg})

  const accessToken = generateAccessToken({id: user._id})
  const refreshToken = generateRefreshToken({id: user._id}, res)

  await User.findOne({_id: user._id}, {
    rf_token: refreshToken
  })

  res.status(200).json({
    msg: `Authenticated as ${user.name}`,
    user: {
      ...user._doc,
      password: ''
    },
    accessToken
  })
}

module.exports = authCtrl