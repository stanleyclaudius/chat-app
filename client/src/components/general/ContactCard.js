import { HiPhotograph } from 'react-icons/hi'
import { FaMicrophone } from 'react-icons/fa'
import Avatar from './Avatar'

const ContactCard = ({ text, audio, user, date, media, selectContact, setSelectContact }) => {
  return (
    <div className={`flex items-center p-4 border-b-2 cursor-pointer ${selectContact._id === user._id ? 'bg-gray-100' : undefined} hover:bg-gray-100 transition-[background]`} onClick={() => setSelectContact(user)}>
      <Avatar src={user.avatar} alt={user.name} />
      <div className='w-full ml-4'>
        <p className='text-lg mb-1'>{user.name}</p>
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
              : <p className='text-sm'>{text}</p>
          }

          {date && <p className='text-sm text-gray-500'>{new Date(date).toLocaleTimeString()}</p>}
        </div>
      </div>
    </div>
  )
}

export default ContactCard