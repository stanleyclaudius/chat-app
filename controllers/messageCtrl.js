const Conversation = require('./../models/Conversation')
const Message = require('./../models/Message')

const messageCtrl = {
  createMessage: async(req, res) => {
    try {
      const { sender, recipient, text, media, audio, files } = req.body

      const conversation = await Conversation.findOneAndUpdate({
        $or: [
          { recipients: [sender, recipient] },
          { recipients: [recipient, sender] }
        ]
      }, {
        recipients: [sender, recipient], text, media, audio, files
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
        files
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
      const messages = await Message.find({
        $or: [
          { sender: req.user._id, recipient: req.params.id },
          { sender: req.params.id, recipient: req.user._id }
        ]
      }).populate('sender recipient', 'avatar name')

      return res.status(200).json({messages})
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

      const data = await Message.updateMany({
        $or: [
          { sender: req.user._id, recipient: req.params.id },
          { sender: req.params.id, recipient: req.user._id }
        ]
      }, { isRead: true })
      
      await Conversation.findOneAndUpdate({_id: findMessage.conversation}, {
        totalUnread: 0
      })

      res.status(200).json({ msg: 'Message read.' })
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

module.exports = messageCtrl