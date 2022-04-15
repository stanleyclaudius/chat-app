const mongoose = require('mongoose')

const connectDB = async() => {
  await mongoose.connect(process.env.MONGO_URL, err => {
    if (err) throw err
    console.log('Successfully connected to MongoDB.')
  })
}

module.exports = connectDB