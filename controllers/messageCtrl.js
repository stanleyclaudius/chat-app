const Conversation = require('./../models/Conversation')
const Message = require('./../models/Message')

const messageCtrl = {
  createMessage: async(req, res) => {
    try {
      const { sender, recipient, text, media } = req.body

      const conversation = await Conversation.findOneAndUpdate({
        $or: [
          { recipients: [sender, recipient] },
          { recipients: [recipient, sender] }
        ]
      }, {
        recipients: [sender, recipient], text, media
      }, {new: true, upsert: true})

      const message = new Message({
        conversation: conversation._id,
        sender,
        recipient,
        text,
        media
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
  }
}

module.exports = messageCtrl