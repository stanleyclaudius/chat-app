import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HiPhoneMissedCall, HiPhotograph } from 'react-icons/hi'
import { FaMicrophone } from 'react-icons/fa'
import { IoIosVideocam, IoIosCall } from 'react-icons/io'
import { AiFillFile } from 'react-icons/ai'
import { updateReadStatus } from './../../redux/actions/messageActions'
import Avatar from './Avatar'
import { IoVideocamOff } from 'react-icons/io5'

const ContactCard = ({ text, audio, user, date, media, files, selectContact, setSelectContact, totalUnread, isOnline, recipients, call }) => {
  const dispatch = useDispatch()
  const { auth, socket } = useSelector(state => state)

  const handleSelectContact = () => {
    if (recipients[1]._id === auth.user?._id && totalUnread > 0) {
      dispatch(updateReadStatus(recipients[0]._id, auth.user?._id, auth.token, socket))
    }
    setSelectContact(user)
  }

  useEffect(() => {
    if (selectContact && recipients[1]._id === auth.user?._id && totalUnread > 0) {
      dispatch(updateReadStatus(recipients[0]._id, auth.user?._id, auth.token, socket))
    }
  }, [dispatch, recipients, socket, auth, totalUnread, selectContact])

  return (
    <div className={`flex items-center p-4 border-b-2 cursor-pointer ${selectContact._id === user._id ? 'bg-gray-100' : undefined} hover:bg-gray-100 transition-[background]`} onClick={handleSelectContact}>
      <div className='relative'>
        <Avatar src={user.avatar} alt={user.name} />
        {
          (recipients[1]._id === auth.user?._id && totalUnread > 0) &&
          <p className='w-fit flex items-center justify-center rounded-full px-2 py-1 bg-blue-400 text-xs text-white absolute top-0 -right-2'>
            {totalUnread}
          </p>
        }
      </div>
      <div className='w-full ml-4'>
        <div className='flex items-center gap-3'>
          <p className='text-lg mb-1'>{user.name}</p>
          {isOnline ? <div className='w-2 h-2 rounded-full bg-green-600' /> : <div className='w-2 h-2 rounded-full bg-gray-300' />}
        </div>
        <div className='flex items-center justify-between'>
          {
            media.length > 0
            ? (
              <div className='flex items-center gap-2'>
                <HiPhotograph />
                {media.length}
              </div>
            )
            : audio
              ? (
                <div className='flex items-center gap-2'>
                  <FaMicrophone />
                  Audio
                </div>
              )
              : files.length > 0
                ? (
                  <div className='flex items-center gap-2'>
                    <AiFillFile />
                    {files.length}
                  </div>
                )
                : call && Object.keys(call).length > 0
                  ? call.video
                    ? (
                      <div className='flex items-center gap-2'>
                        {call.times > 0 ? <IoIosVideocam /> : <IoVideocamOff />}
                        {
                          call.times > 0
                          ? (
                            <div className='flex items-center gap-2'>
                              <p>{parseInt(call.times / 3600).toString().length < 2 ? '0' + parseInt(call.times / 3600) : parseInt(call.times / 3600)}</p>
                              <p>:</p>
                              <p>{parseInt(call.times / 60).toString().length < 2 ? '0' + parseInt(call.times/60) : parseInt(call.times / 60)}</p>
                              <p>:</p>
                              <p>{(call.times % 60).toString().length < 2 ? '0' + call.times % 60 : call.times % 60}</p>
                            </div>
                          )
                          : <p>Missed</p>
                        }
                      </div>
                    )
                    : !call.video
                      ? (
                        <div className='flex items-center gap-2'>
                          {call.times > 0 ? <IoIosCall /> : <HiPhoneMissedCall />}
                          {
                            call.times > 0
                            ? (
                              <div className='flex items-center gap-2'>
                                <p>{parseInt(call.times / 3600).toString().length < 2 ? '0' + parseInt(call.times / 3600) : parseInt(call.times / 3600)}</p>
                                <p>:</p>
                                <p>{parseInt(call.times / 60).toString().length < 2 ? '0' + parseInt(call.times/60) : parseInt(call.times / 60)}</p>
                                <p>:</p>
                                <p>{(call.times % 60).toString().length < 2 ? '0' + call.times % 60 : call.times % 60}</p>
                              </div>
                            )
                            : <p>Missed</p>
                          }
                        </div>
                      )
                      : ''
                  : <p className='text-sm'>{text}</p>
          }

          {date && <p className='text-sm text-gray-500'>{new Date(date).toLocaleTimeString()}</p>}
        </div>
      </div>
    </div>
  )
}

export default ContactCard