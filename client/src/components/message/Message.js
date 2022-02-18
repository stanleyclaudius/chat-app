import { useSelector } from 'react-redux'
import Avatar from './../general/Avatar'

const Message = ({ type, message, recipientAvatar, audio, media, timestamp }) => {
  const { auth } = useSelector(state => state)

  return (
    <div className={`mb-7 flex ${type === 'sender' ? 'items-end' : 'items-start'} ${type === 'sender' ? 'justify-end' : 'justify-start'} flex-col`}>
      {
        message &&
        <div className={`flex ${type === 'sender' ? 'flex-row-reverse' : undefined}`}>
          <Avatar src={type === 'sender' ? auth.user?.avatar : recipientAvatar} size='30px' />
            <div className={`max-w-[20rem] w-fit float-right break-all ${type === 'sender' ? 'bg-[#41AEF3]' : 'bg-gray-100'} p-3 rounded-md mb-2 ${type === 'sender' ? 'text-white' : undefined} ${type === 'sender' ? 'mr-3' : 'ml-3'}`}>
              {message}
            </div>
        </div>
      }
      
      {
        media.length > 0 &&
        <div className={`flex ${type === 'sender' ? 'flex-row-reverse' : undefined}`}>
          {!message && <Avatar src={type === 'sender' ? auth.user?.avatar : recipientAvatar} size='30px' />}
          <div className={`${type === 'sender' ? `${message ? '-translate-x-[50px]' : '-translate-x-3'}` : `${message ? 'translate-x-[50px]' : 'translate-x-3'}`}`}>
            {
              media.map((item, idx) => (
                <img key={idx} src={item} alt={idx} className='w-40 h-40 mb-3' />
              ))
            }
          </div>
        </div>
      }

      {
        audio &&
        <div className={`flex ${type === 'sender' ? 'flex-row-reverse' : undefined}`}>
          <Avatar src={type === 'sender' ? auth.user?.avatar : recipientAvatar} size='30px' />
          <div className={`${type === 'sender' ? `${message ? '-translate-x-[50px]' : '-translate-x-3'}` : `${message ? 'translate-x-[50px]' : 'translate-x-3'}`}`}>
            <audio controls>
              <source src={audio} />
            </audio>
          </div>
        </div>
      }
      
      <p className={`${type === 'sender' ? '-translate-x-[50px]' : 'translate-x-[50px]'} text-gray-400`}>{timestamp}</p>
    </div>
  )
}

export default Message