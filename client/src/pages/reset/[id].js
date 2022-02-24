import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { BiLock } from 'react-icons/bi'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { GLOBAL_TYPES } from './../../redux/types/globalTypes'
import { resetPassword } from './../../redux/actions/authActions'
import Loader from './../../components/general/Loader'
import HeadInfo from './../../utils/HeadInfo'

const ResetPassword = () => {
  const { id } = useParams()

  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { auth, alert } = useSelector(state => state)

  const handleSubmit = async e => {
    e.preventDefault()

    if (!password)
      return dispatch({ type: GLOBAL_TYPES.ALERT, payload: {errors: 'Please provide your new password.'} })
    else if (password.length < 8)
      return dispatch({ type: GLOBAL_TYPES.ALERT, payload: {errors: 'Password should be at least 8 characters.'} })

    if (password !== passwordConfirmation)
      return dispatch({ type: GLOBAL_TYPES.ALERT, payload: {errors: 'Password confirmation should be matched.'} })

    await dispatch(resetPassword(id, password))
    navigate('/')
  }

  useEffect(() => {
    if (auth.user)
      navigate('/')
  }, [auth.user, navigate])

  return (
    <>
      <HeadInfo title='Inspace - Reset Password' />
      <div className='flex'>
        <div className='p-9 flex-1'>
          <div className='flex items-center mb-12'>
            <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt='Inspace' />
            <h1 className='text-3xl ml-6 font-logo'>Inspace</h1>
          </div>
          <h1 className='text-3xl font-medium mb-7'>Reset Password</h1>
          <form onSubmit={handleSubmit} className='mb-10'>
            <div className='border border-gray-500 flex items-center rounded-md px-3 pr-5 mb-9'>
              <BiLock className='text-gray-500 text-xl' />
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' className='w-full h-11 outline-0 ml-5 pr-4' />
              {
                showPassword
                ? <FaEyeSlash className='text-gray-600 cursor-pointer' onClick={() => setShowPassword(false)} />
                : <FaEye className='text-gray-600 cursor-pointer' onClick={() => setShowPassword(true)} />
              }
            </div>
            <div className='border border-gray-500 flex items-center rounded-md px-3 pr-5 mb-9'>
              <BiLock className='text-gray-500 text-xl' />
              <input type={showPasswordConfirmation ? 'text' : 'password'} value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} placeholder='Password Confirmation' className='w-full h-11 outline-0 ml-5 pr-4' />
              {
                showPasswordConfirmation
                ? <FaEyeSlash className='text-gray-600 cursor-pointer' onClick={() => setShowPasswordConfirmation(false)} />
                : <FaEye className='text-gray-600 cursor-pointer' onClick={() => setShowPasswordConfirmation(true)} />
              }
            </div>
            <button className={`${alert.loading ? 'bg-blue-300' : 'bg-blue-500'} text-white rounded-full w-32 h-10 ${!alert.loading ? 'hover:bg-blue-700' : undefined} transition-[background] ${alert.loading ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={alert.loading ? true : false}>
              {
                alert.loading
                ? (
                  <Loader />
                )
                : 'Reset Password'
              }
            </button>
          </form>
        </div>
        <div className='md:block hidden w-full flex-[2] pointer-events-none'>
          <img src={`${process.env.PUBLIC_URL}/images/authentication.png`} alt='Inspace Authentication' className='w-full h-screen object-cover' />
        </div>
      </div>
    </>
  )
}

export default ResetPassword