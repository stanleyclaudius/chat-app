import Avatar from './../general/Avatar'

const Message = ({ type, message, timestamp }) => {
  return (
    <div className={`mb-7 flex ${type === 'sender' ? 'items-end' : 'items-start'} ${type === 'sender' ? 'justify-end' : 'justify-start'} flex-col`}>
      <div className={`flex ${type === 'sender' ? 'flex-row-reverse' : undefined}`}>
        <Avatar size='30px' />
        <div className={`max-w-[20rem] w-fit float-right break-all ${type === 'sender' ? 'bg-[#41AEF3]' : 'bg-gray-100'} p-3 rounded-md mb-2 ${type === 'sender' ? 'text-white' : undefined} ${type === 'sender' ? 'mr-3' : 'ml-3'}`}>
          {message}
        </div>
      </div>
      <p className={`${type === 'sender' ? '-translate-x-[50px]' : 'translate-x-[50px]'} text-gray-400`}>{timestamp}</p>
    </div>
  )
}

export default Message