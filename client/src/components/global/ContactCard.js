import Avatar from './Avatar'

const ContactCard = () => {
  return (
    <div className='mb-5 flex items-center bg-gray-100 rounded-md p-4 cursor-pointer hover:bg-gray-200 transition-[background]'>
      <Avatar />
      <div className='w-full ml-4'>
        <p className='text-xl mb-2'>Lorem Ipsum</p>
        <div className='flex items-center justify-between'>
          <p>Last message goes here</p>
          <p>15:20</p>
        </div>
      </div>
    </div>
  )
}

export default ContactCard