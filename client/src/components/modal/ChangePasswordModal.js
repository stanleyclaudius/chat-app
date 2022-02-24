import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { GLOBAL_TYPES } from './../../redux/types/globalTypes'
import { changePassword } from './../../redux/actions/authActions'
import Loader from './../general/Loader'

const ChangePasswordModal = ({ changePasswordRef, openChangePasswordModal, setOpenChangePasswordModal }) => {
  const [passwordData, setPasswordData] = useState({
    currPassword: '',
    newPassword: '',
    passwordConfirmation: ''
  })
  const [showCurrPassword, setShowCurrPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)
  
  const handleChange = e => {
    const { name, value } = e.target
    setPasswordData({...passwordData, [name]: value})
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!passwordData.currPassword)
      return dispatch({ type: GLOBAL_TYPES.ALERT, payload: {errors: 'Please provide current password field.'} })

    if (!passwordData.newPassword)
      return dispatch({ type: GLOBAL_TYPES.ALERT, payload: {errors: 'Please provide your new password.'} })
    else if (passwordData.newPassword.length < 8)
      return dispatch({ type: GLOBAL_TYPES.ALERT, payload: {errors: 'New password should be at least 8 characters.'} })

    if (passwordData.newPassword !== passwordData.passwordConfirmation)
      return dispatch({ type: GLOBAL_TYPES.ALERT, payload: {errors: 'Password confirmation should be matched.'} })

    setLoading(true)
    await dispatch(changePassword(passwordData, auth.token))
    setLoading(false)
    setPasswordData({
      currPassword: '',
      newPassword: '',
      passwordConfirmation: ''
    })
    setOpenChangePasswordModal(false)
  }

  return (
    <div className={`${openChangePasswordModal ? 'opacity-100' : 'opacity-0'} ${openChangePasswordModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 z-[9999] bg-[rgba(0,0,0,.6)] p-5`}>
      <div ref={changePasswordRef} className={`${openChangePasswordModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[500px] bg-white rounded-md`}>
        <div className='flex items-center justify-between py-3 px-5 border-b-2'>
          <h1 className='text-xl'>Change Password</h1>
          <AiOutlineClose className='cursor-pointer text-xl' onClick={() => setOpenChangePasswordModal(false)} />
        </div>
        <div className='p-5'>
          <form onSubmit={handleSubmit}>
            <div className='mb-6'>
              <label htmlFor='currPassword'>Current Password</label>
              <div className='flex items-center justify-between border-2 border-gray-400 rounded-md px-3 py-2 mt-3'>
                <input type={showCurrPassword ? 'text' : 'password'} id='currPassword' name='currPassword' value={passwordData.currPassword} onChange={handleChange} className='w-full outline-0' />
                {
                  showCurrPassword
                  ? <FaEyeSlash onClick={() => setShowCurrPassword(false)} className='text-gray-500 cursor-pointer' />
                  : <FaEye onClick={() => setShowCurrPassword(true)} className='text-gray-500 cursor-pointer' />
                }
              </div>
            </div>
            <div className='mb-6'>
              <label htmlFor='newPassword'>New Password</label>
              <div className='flex items-center justify-between border-2 border-gray-400 rounded-md px-3 py-2 mt-3'>
                <input type={showNewPassword ? 'text' : 'password'} id='newPassword' name='newPassword' value={passwordData.newPassword} onChange={handleChange} className='w-full outline-0' />
                {
                  showNewPassword
                  ? <FaEyeSlash onClick={() => setShowNewPassword(false)} className='text-gray-500 cursor-pointer' />
                  : <FaEye onClick={() => setShowNewPassword(true)} className='text-gray-500 cursor-pointer' />
                }
              </div>
            </div>
            <div className='mb-6'>
              <label htmlFor='passwordConfirmation'>Current Password</label>
              <div className='flex items-center justify-between border-2 border-gray-400 rounded-md px-3 py-2 mt-3'>
                <input type={showPasswordConfirmation ? 'text' : 'password'} id='passwordConfirmation' name='passwordConfirmation' value={passwordData.passwordConfirmation} onChange={handleChange} className='w-full outline-0' />
                {
                  showPasswordConfirmation
                  ? <FaEyeSlash onClick={() => setShowPasswordConfirmation(false)} className='text-gray-500 cursor-pointer' />
                  : <FaEye onClick={() => setShowPasswordConfirmation(true)} className='text-gray-500 cursor-pointer' />
                }
              </div>
            </div>
            <button type='submit' className={`${loading ? 'bg-blue-300' : 'bg-blue-500'} ${!loading ? 'hover:bg-blue-600' : undefined} transition-[background] w-32 h-10 float-right text-white rounded-md ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={loading ? true : false}>
              {
                loading
                ? (
                  <Loader />
                )
                : 'Save Changes'
              }
            </button>
            <div className='clear-both' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordModal