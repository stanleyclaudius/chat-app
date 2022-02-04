const User = require('./../models/User')

const userCtrl = {
  searchUser: async(req, res) => {
    try {
      const { id } = req.params
      const user = await User.find({
        $text: { $search: id }
      })

      if (user.length === 0)
        return res.status(404).json({msg: 'User not found.'})

      return res.status(200).json({
        ...user[0]._doc,
        password: ''
      })
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  addFriend: async(req, res) => {
    try {
      const { id } = req.params
      console.log(id)
      const user = await User.findOne({userId: id})
      if (!user)
        return res.status(404).json({msg: 'User not found.'})

      await User.findOneAndUpdate({_id: req.user._id}, {
        $push: { friends: user._id }
      })

      return res.status(200).json({
        user: {
          name: user.name,
          avatar: user.avatar,
          userId: user.userId,
          _id: user._id
        },
        msg: `Successfully added ${user.name} as friend.`
      })
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

module.exports = userCtrl