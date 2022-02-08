import Avatar from './Avatar'

const ContactCard = ({ text, user, date, setSelectContact }) => {
  return (
    <div className='flex items-center p-4 border-b-2 cursor-pointer hover:bg-gray-100 transition-[background]' onClick={() => setSelectContact(user)}>
      <Avatar src={user.avatar} alt={user.name} />
      <div className='w-full ml-4'>
        <p className='text-lg mb-1'>{user.name}</p>
        {
          (text && date) &&
          <div className='flex items-center justify-between'>
            <p className='text-sm'>{text}</p>
            <p className='text-sm text-gray-500'>{new Date(date).toLocaleTimeString()}</p>
          </div>
        }
      </div>
    </div>
  )
}

export default ContactCard