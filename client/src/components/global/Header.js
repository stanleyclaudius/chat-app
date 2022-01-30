import { IoChevronBackOutline } from 'react-icons/io5'
import { GoKebabVertical } from 'react-icons/go'
import Avatar from './../global/Avatar'

const Header = ({ type, name, status, setSelectContact }) => {
  return (
    <div className='w-full h-24 bg-gradient-to-r from-[#87CBFF] to-[#26A2EE] flex items-center p-6 justify-between'>
      <div className='flex items-center'>
        {type === 'others' && <IoChevronBackOutline onClick={() => setSelectContact(false)} className='text-2xl mr-3 text-white' />}
        <Avatar />
        <div className='ml-5'>
          <p className='text-white font-medium text-2xl'>{name}</p>
          <p className='text-white mt-2'>{status}</p>
        </div>
      </div>
      <div>
        <GoKebabVertical className='text-white text-2xl cursor-pointer' />
      </div>
    </div>
  )
}

export default Header