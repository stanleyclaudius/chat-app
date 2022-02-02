import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { FaRegUser } from 'react-icons/fa'
import { GLOBAL_TYPES } from './../../redux/types/globalTypes'
import { forgetPassword } from './../../redux/actions/authActions'
import { checkEmail } from './../../utils/checkEmail'
import Loader from './../general/Loader'

const ForgetPasswordModal = ({ openForgetModal, setOpenForgetModal }) => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault()
    
    if (!email)
      return dispatch({ type: GLOBAL_TYPES.ALERT, payload: {errors: 'Please provide email field.'} })
    else if (!checkEmail(email))
      return dispatch({ type: GLOBAL_TYPES.ALERT, payload: {errors: 'Please provide valid email address.'} })
    
    setLoading(true)
    await dispatch(forgetPassword(email))
    setLoading(false)
    setEmail('')
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
              <input type='text' placeholder='Email' className='w-full ml-3 outline-0' autoComplete='off' value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <button type='submit' className={`${loading ? 'bg-blue-300' : 'bg-blue-500'} text-white mt-4 rounded-md w-20 h-9 ${!loading ? 'hover:bg-blue-600' : undefined} float-right ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={loading ? true : false}>
              {
                loading
                ? (
                  <Loader />
                )
                : 'Submit'
              }
            </button>
            <div className='clear-both' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgetPasswordModal