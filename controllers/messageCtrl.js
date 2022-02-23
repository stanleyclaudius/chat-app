const Conversation = require('./../models/Conversation')
const Message = require('./../models/Message')

class APIFeatures {
  constructor(query, queryStr) {
    this.query = query
    this.queryStr = queryStr
  }

  paginate() {
    const page = this.queryStr.page || 1
    const limit = this.queryStr.limit || 9
    const skip = (page - 1) * limit
    this.query = this.query.skip(skip).limit(limit)
    return this
  }
}

const messageCtrl = {
  createMessage: async(req, res) => {
    try {
      const { sender, recipient, text, media, audio, files, call } = req.body

      const conversation = await Conversation.findOneAndUpdate({
        $or: [
          { recipients: [sender, recipient] },
          { recipients: [recipient, sender] }
        ]
      }, {
        recipients: [sender, recipient], text, media, audio, files, call
      }, {new: true, upsert: true})

      const prevTotalUnread = conversation.totalUnread

      await Conversation.findOneAndUpdate({ _id: conversation._id }, {
        totalUnread: prevTotalUnread + 1
      }, { new: true })

      const message = new Message({
        conversation: conversation._id,
        sender,
        recipient,
        text,
        media,
        audio,
        files,
        call
      })

      await message.save()

      return res.status(200).json({msg: 'Chat created.'})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  getConversation: async(req, res) => {
    try {
      const conversation = await Conversation.find({recipients: req.user._id}).populate('recipients', 'avatar name').sort('-updatedAt')
      return res.status(200).json({conversation})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  getMessage: async(req, res) => {
    try {
      const features = new APIFeatures(
        Message.find({
          $or: [
            { sender: req.user._id, recipient: req.params.id },
            { sender: req.params.id, recipient: req.user._id }
          ]
        }),
        req.query
      ).paginate()

      const messages = await features.query.sort('-createdAt').populate('sender recipient', 'avatar name')

      return res.status(200).json({messages, result: messages.length})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  udpateReadStatus: async(req, res) => {
    try {
      const findMessage = await Message.findOne({
        $or: [
          { sender: req.user._id, recipient: req.params.id },
          { sender: req.params.id, recipient: req.user._id }
        ]
      })

      await Message.updateMany({
        $or: [
          { sender: req.user._id, recipient: req.params.id },
          { sender: req.params.id, recipient: req.user._id }
        ]
      }, { isRead: true })
      
      await Conversation.findOneAndUpdate({_id: findMessage.conversation}, {
        totalUnread: 0
      })

      res.status(200).json({ conversation: findMessage.conversation })
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

module.exports = messageCtrl