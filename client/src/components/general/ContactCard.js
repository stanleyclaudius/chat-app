import { useDispatch, useSelector } from 'react-redux'
import { HiPhotograph } from 'react-icons/hi'
import { FaMicrophone } from 'react-icons/fa'
import { AiFillFile } from 'react-icons/ai'
import { updateReadStatus } from './../../redux/actions/messageActions'
import Avatar from './Avatar'

const ContactCard = ({ text, audio, user, date, media, files, selectContact, setSelectContact, totalUnread, isOnline, recipients }) => {
  const dispatch = useDispatch()
  const { auth, socket } = useSelector(state => state)

  const handleSelectContact = () => {
    if (recipients[1]._id === auth.user?._id && totalUnread > 0) {
      dispatch(updateReadStatus(recipients[0]._id, auth.user?._id, auth.token, socket))
    }
    setSelectContact(user)
  }

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
          {isOnline && <div className='w-2 h-2 rounded-full bg-green-600' />}
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
                : <p className='text-sm'>{text}</p>
          }

          {date && <p className='text-sm text-gray-500'>{new Date(date).toLocaleTimeString()}</p>}
        </div>
      </div>
    </div>
  )
}

export default ContactCard