import Avatar from './Avatar'

const PersonCard = () => {
  return (
    <div className='flex items-center shadow-md border border-gray-300 rounded-md py-3 px-4 hover:scale-[1.03] transition-transform'>
      <Avatar />
      <div className='ml-5'>
        <p className='text-lg'>Lorem Ipsum</p>
        <button className='text-[12px] mt-1 bg-blue-500 text-white font-medium rounded-md py-1 px-2 hover:bg-blue-600 transition-background'>CHAT</button>
      </div>
    </div>
  )
}

export default PersonCard