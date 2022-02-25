import { useState, useEffect, useCallback } from 'react'
import { AiOutlineWechat } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { MESSAGE_TYPES } from './../redux/types/messageTypes'
import { getConversation, getMessages } from './../redux/actions/messageActions'
import ChatInput from './../components/input/ChatInput'
import SearchForm from './../components/input/SearchForm'
import MessageContainer from '../components/message/MessageContainer'
import ContactContainer from '../components/general/ContactContainer'
import Header from './../components/general/Header'
import HeadInfo from './../utils/HeadInfo'

const Dashboard = () => {
  const [selectContact, setSelectContact] = useState(false)
  const [searchContact, setSearchContact] = useState('')
  const [contacts, setContacts] = useState([])

  const dispatch = useDispatch()
  const { auth, conversation, message } = useSelector(state => state)

  const searchConversation = useCallback(async() => {
    const filteredContact = conversation.filter(item => 
      (item.recipients[0].name.match(new RegExp(`${searchContact}`, "i")) && item.recipients[0]._id !== auth.user?._id) ||
      (item.recipients[1].name.match(new RegExp(`${searchContact}`, "i")) && item.recipients[1]._id !== auth.user?._id)
    )
    setContacts(filteredContact)
  }, [conversation, searchContact, auth])

  useEffect(() => {
    if (selectContact)
      dispatch(getMessages(selectContact._id, auth.token))
    else
      dispatch({ type: MESSAGE_TYPES.CLEAR_MESSAGE })
  }, [selectContact, auth.token, dispatch])

  useEffect(() => {
    if (!searchContact)
      dispatch(getConversation(auth.token))
  }, [dispatch, auth.token, searchContact])

  useEffect(() => {
    if (searchContact.length > 3) {
      searchConversation()
    }
  }, [searchContact, searchConversation])

  useEffect(() => {
    setContacts(conversation)
  }, [conversation])

  return (
    <>
      <HeadInfo title='Inspace - Message' />
      <Header selectContact={selectContact} setSelectContact={setSelectContact} />
      <div className='md:flex md:static relative overflow-x-hidden'>
        <div className='md:flex-1 md:border-r-2'>
          <SearchForm placeholder='Search contact ...' value={searchContact} onChange={e => setSearchContact(e.target.value)} disabled={conversation.length > 0 ? false : true} />
          <ContactContainer conversation={contacts} selectContact={selectContact} setSelectContact={setSelectContact} />
        </div>
        <div className={`md:flex-[3] md:static transition-all duration-200 absolute top-0 bottom-0 bg-white md:h-[90vh] w-full flex flex-col ${selectContact ? 'right-0' : '-right-[5000px]'}`}>
          {
            selectContact
            ? (
              <>
                <MessageContainer selectContact={selectContact} messages={message} />
                <ChatInput selectContact={selectContact} />
              </>
            )
            : (
              <div className='flex items-center justify-center flex-col h-full animate-bounce'>
                <AiOutlineWechat className='text-gray-400 text-9xl' />
                <h1 className='text-3xl text-gray-400 mt-5 font-medium'>Select Friends To Chat With</h1>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Dashboard