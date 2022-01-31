import Avatar from './Avatar'

const ContactCard = ({ setSelectContact }) => {
  return (
    <div className='flex items-center p-4 border-b-2 cursor-pointer hover:bg-gray-100 transition-[background]' onClick={() => setSelectContact(true)}>
      <Avatar />
      <div className='w-full ml-4'>
        <p className='text-lg mb-1'>Lorem Ipsum</p>
        <div className='flex items-center justify-between'>
          <p className='text-sm'>Last message goes here</p>
          <p className='text-sm text-gray-500'>15:20</p>
        </div>
      </div>
    </div>
  )
}

export default ContactCard