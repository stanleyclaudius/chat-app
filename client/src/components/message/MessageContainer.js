import { useState, useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MESSAGE_TYPES } from './../../redux/types/messageTypes'
import { checkTokenValidity } from './../../utils/checkTokenValidity'
import { getDataAPI } from './../../utils/fetchData'
import Loader from './../general/Loader'
import Message from './Message'
import HeadInfo from './../../utils/HeadInfo'

const MessageContainer = ({ selectContact, messages }) => {
  const [currPage, setCurrPage] = useState(2)
  const [isLoading, setIsLoading] = useState(false)
  const [firstLoad, setFirstLoad] = useState(false)

  const dispatch = useDispatch()
  const { auth, typing } = useSelector(state => state)

  const messageContainerRef = useRef()
  const loadMoreRef = useRef()

  const loadMoreMessages = useCallback(async() => {
    if (firstLoad) {
      const tokenValidity = await checkTokenValidity(auth.token, dispatch)
      const accessToken = tokenValidity ? tokenValidity : auth.token

      setIsLoading(true)
      const res = await getDataAPI(`message/${selectContact._id}?page=${currPage}`, accessToken)
      dispatch({
        type: MESSAGE_TYPES.LOAD_MESSAGE,
        payload: res.data
      })
      setCurrPage(prevVal => prevVal + 1)
      setIsLoading(false)
      document.getElementById('messageContainer').scroll(0, document.documentElement.scrollHeight + 300)
    }
  }, [auth.token, selectContact, currPage, dispatch, firstLoad])

  useEffect(() => {
    const observer = new IntersectionObserver(async entries => {
      if (entries[0].isIntersecting) {
        await loadMoreMessages()
      }
    }, {
      threshold: 1
    })

    if (messages.result === 9 * (currPage - 1) && !isLoading) {
      observer.observe(loadMoreRef.current)
    }
  }, [messages.result, isLoading, currPage, loadMoreMessages])

  useEffect(() => {
    if (messageContainerRef) {
      messageContainerRef.current.addEventListener('DOMNodeInserted', e => {
        const { currentTarget: target } = e
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' })
      })
    }
  }, [])

  useEffect(() => {
    if (selectContact) {
      dispatch({ type: MESSAGE_TYPES.CLEAR_MESSAGE })
      setCurrPage(2)
      setFirstLoad(false)
    }
  }, [dispatch, selectContact])

  useEffect(() => {
    const load = setTimeout(() => {
      if (!firstLoad)
        setFirstLoad(true)
    }, 2000)

    return () => clearTimeout(load)
  }, [firstLoad])

  return (
    <>
      <HeadInfo title={`Inspace - ${selectContact.name}`} />
      <div className='overflow-x-hidden flex-1 px-5 py-7 overflow-auto message-container' id='messageContainer' ref={messageContainerRef}>
        {
          messages.result < 9 * (currPage - 1)
          ? ''
          : (
            <>
              {
                isLoading
                ? <Loader xl />
                : <button className='bg-gray-200 rounded-md p-3 w-full opacity-0' onClick={loadMoreMessages} ref={loadMoreRef}>Load More</button>
              }
            </>
          )
        }

        {
          messages?.data?.map((item, idx) => (
            <Message
              key={idx}
              type={item.sender._id === auth.user?._id ? 'sender' : 'receiver'}
              sender={item.sender}
              recipientAvatar={item.sender?.avatar}
              message={item.text}
              media={item.media}
              audio={item.audio}
              files={item.files}
              isRead={item.isRead}
              call={item.call}
              timestamp={new Date(item.createdAt).toLocaleString()}
            />
          ))
        }
        <p className='animate-bounce'>{typing.message && typing.message}</p>
      </div>
    </>
  )
}

export default MessageContainer