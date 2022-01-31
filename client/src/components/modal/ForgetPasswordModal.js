import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FaRegUser } from 'react-icons/fa'

const ForgetPasswordModal = ({ openForgetModal, setOpenForgetModal }) => {
  const [email, setEmail] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div className={`${openForgetModal ? 'opacity-100' : 'opacity-0'} ${openForgetModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity fixed top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,.6)] flex items-center justify-center p-5`}>
      <div className={`${openForgetModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[400px] bg-white rounded-md`}>
        <div className='flex items-center justify-between py-3 px-5 border-b-2'>
          <h1 className='text-xl'>Forget Password</h1>
          <AiOutlineClose className='cursor-pointer text-xl' onClick={() => setOpenForgetModal(false)} />
        </div>
        <div className='p-5'>
          <form onSubmit={handleSubmit}>
            <div className='flex items-center border-2 rounded-md py-2 px-3'>
              <FaRegUser className='text-gray-500' />
              <input type='text' placeholder='Email' className='w-full ml-3' autoComplete='off' value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <button type='submit' className='bg-blue-500 text-white mt-4 rounded-md w-20 h-9 hover:bg-blue-600 float-right'>Submit</button>
            <div className='clear-both' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgetPasswordModal