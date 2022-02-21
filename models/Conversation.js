const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
  recipients: [{type: mongoose.Types.ObjectId, ref: 'user'}],
  text: String,
  media: Array,
  audio: String,
  files: Array,
  call: Object,
  totalUnread: { type: Number, default: 0 }
}, {
  timestamps: true
})

module.exports = mongoose.model('conversation', conversationSchema)