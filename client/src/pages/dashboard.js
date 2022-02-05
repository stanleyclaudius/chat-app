import { useState, useEffect } from 'react'
import { AiOutlineWechat } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { MESSAGE_TYPES } from './../redux/types/messageTypes'
import { getConversation, getMessages } from './../redux/actions/messageActions'
import ChatInput from './../components/input/ChatInput'
import SearchForm from './../components/input/SearchForm'
import MessageContainer from '../components/message/MessageContainer'
import ContactContainer from '../components/general/ContactContainer'
import Header from './../components/general/Header'

const Dashboard = () => {
  const [selectContact, setSelectContact] = useState(false)

  const dispatch = useDispatch()
  const { auth, conversation, message } = useSelector(state => state)

  useEffect(() => {
    if (selectContact)
      dispatch(getMessages(selectContact, auth.token))
    else
      dispatch({ type: MESSAGE_TYPES.CLEAR_MESSAGE })
  }, [selectContact, auth.token, dispatch])

  useEffect(() => {
    dispatch(getConversation(auth.token))
  }, [dispatch, auth.token])

  return (
    <>
      <Header selectContact={selectContact} setSelectContact={setSelectContact} />
      <div className='md:flex md:static relative overflow-x-hidden'>
        <div className='md:flex-1 md:border-r-2'>
          <SearchForm placeholder='Search contact ...' />
          <ContactContainer conversation={conversation} setSelectContact={setSelectContact} />
        </div>
        <div className={`md:flex-[3] md:static transition-all duration-200 absolute top-0 bottom-0 h-[100%] bg-white md:h-[90vh] w-full flex flex-col ${selectContact ? 'right-0' : '-right-[5000px]'}`}>
          {
            selectContact
            ? (
              <>
                <MessageContainer messages={message} />
                <ChatInput />
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