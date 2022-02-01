module.exports.checkDataValidity = (req, res, next) => {
  const { name, email, password } = req.body
  const msg = []

  if (!name) {
    msg.push('Please provide your name.')
  }

  if (!email) {
    msg.push('Please provide your email address.')
  } else if (!checkEmail(email)) {
    msg.push('Please provide valid email address.')
  }

  if (!password) {
    msg.push('Please provide your password.')
  } else if (password.length < 8) {
    msg.push('Password length should be at least 8 characters.')
  }

  if (msg.length > 0) {
    return res.status(400).json({msg})
  }

  next()
}

const checkEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}