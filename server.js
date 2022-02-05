const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const SocketServer = require('./SocketServer')

dotenv.config({
  path: './config/.env'
})

const app = express()

const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
  SocketServer(socket)
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))

app.use('/api/v1/auth', require('./routes/auth.route'))
app.use('/api/v1/user', require('./routes/user.route'))
app.use('/api/v1/message', require('./routes/message.route'))

connectDB()
http.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}.`))