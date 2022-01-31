import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FaRegUser } from 'react-icons/fa'
import Avatar from './../general/Avatar'

const SearchPeopleModal = ({ openSearchPeopleModal, setOpenSearchPeopleModal }) => {
  const [userId, setUserId] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div className={`${openSearchPeopleModal ? 'opacity-100' : 'opacity-0'} ${openSearchPeopleModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.6)] flex items-center justify-center p-5 z-[9999]`}>
      <div className={`${openSearchPeopleModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[400px] bg-white rounded-md`}>
        <div className='flex items-center justify-between px-5 py-3 border-b-2'>
          <h1 className='text-xl'>Search People</h1>
          <AiOutlineClose className='text-xl cursor-pointer' onClick={() => setOpenSearchPeopleModal(false)} />
        </div>
        <div className='p-5'>
          <form onSubmit={handleSubmit}>
            <div className='w-full border-2 rounded-md py-2 px-3 flex items-center'>
              <FaRegUser className='text-gray-500 mr-3' />
              <input type='text' placeholder='User ID' autoComplete='off' value={userId} onChange={e => setUserId(e.target.value)} className='w-full outline-0' />
            </div>
            <button type='submit' className='bg-blue-500 mt-4 hover:bg-blue-600 transition-[background] w-20 h-9 text-white rounded-md float-right'>Search</button>
            <div className='clear-both' />
          </form>

          <div className='text-center border-2 shadow-lg w-fit m-auto rounded-md p-4 mt-6'>
            <div className='flex justify-center'>
              <Avatar />
            </div>
            <h1 className='text-lg my-3'>Lorem Ipsum</h1>
            <button className='bg-blue-500 hover:bg-blue-600 text-sm transition-[background] w-20 h-8 text-white rounded-md'>Add Friend</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPeopleModal