import { CONVERSATION_TYPES } from './../types/conversationTypes'
import { MESSAGE_TYPES } from './../types/messageTypes'

const conversationReducer = (state = [], action) => {
  switch (action.type) {
    case CONVERSATION_TYPES.GET_CONVERSATION:
      return action.payload
    case CONVERSATION_TYPES.UPDATE_CONVERSATION:
      const conversationData = state.find(item => (
        (item.recipients[0]._id === action.payload.sender._id && item.recipients[1]._id === action.payload.recipient._id) ||
        (item.recipients[0]._id === action.payload.recipient._id && item.recipients[1]._id === action.payload.sender._id)
      ))
      
      const newConversationData = {
        ...conversationData,
        recipients: [
          action.payload.sender,
          action.payload.recipient
        ],
        text: action.payload.text,
        media: action.payload.media,
        audio: action.payload.audio,
        files: action.payload.files,
        call: action.payload.call,
        totalUnread: conversationData.totalUnread + 1,
        createdAt: action.payload.createdAt,
        updatedAt: action.payload.updatedAt
      }

      const tempState = state.filter(item => item._id !== newConversationData._id)
      return [newConversationData, ...tempState]
    case CONVERSATION_TYPES.ADD_CONVERSATION:
      const conversationAvailable = state.find(item => item.recipients[0]._id === action.payload.recipientId || item.recipients[1]._id === action.payload.recipientId)

      if (!conversationAvailable) {
        const data = {
          media: action.payload.media ? action.payload.media : [],
          text: action.payload.text ? action.payload.text : '',
          audio: action.payload.audio ? action.paylaod.audio: '',
          files: action.payload.files ? action.payload.files : [],
          call: action.payload.call ? action.payload.call : {},
          createdAt: action.payload.createdAt ? action.payload.createdAt : '',
          updatedAt: action.payload.updatedAt ? action.payload.updatedAt : '',
          recipients: [
            {
              _id: action.payload.senderId,
              name: action.payload.senderName,
              avatar: action.payload.senderAvatar
            },
            {
              _id: action.payload.recipientId,
              name: action.payload.recipientName,
              avatar: action.payload.recipientAvatar
            }
          ]
        }
        
        return [data, ...state]
      }
      return state
    case MESSAGE_TYPES.UPDATE_READ_STATUS:
      return state.map(item => item._id === action.payload ? {...item, totalUnread: 0} : item)
    default:
      return state
  }
}

export default conversationReducer