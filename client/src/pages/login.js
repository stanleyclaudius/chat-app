import { useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { BiLock } from 'react-icons/bi'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } from './../utils/constant'
import GoogleLogin from 'react-google-login-lite'
import FacebookLogin from 'react-facebook-login-lite'

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const onGoogleSuccess = response => {
    console.log(response)
  }

  const onFacebookSuccess = response => {
    console.log(response)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setUserData({...userData, [name]: value})
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div className='flex'>
      <div className='p-9 flex-1'>
        <div className='flex items-center mb-12'>
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt='Inspace' />
          <h1 className='text-2xl ml-6'>Inspace</h1>
        </div>
        <h1 className='text-3xl font-medium mb-7'>Sign In</h1>
        <form onSubmit={handleSubmit} className='mb-10'>
          <div className='border border-gray-500 flex items-center rounded-md px-3 mb-7'>
            <FaRegUser className='text-gray-500' />
            <input type='text' name='email' value={userData.email} onChange={handleChange} placeholder='Email Address' autoComplete='off' className='ml-5 w-full h-11 outline-0' />
          </div>
          <div className='mb-9'>
            <div className='border border-gray-500 flex items-center rounded-md px-3 pr-5 mb-3'>
              <BiLock className='text-gray-500 text-xl' />
              <input type={showPassword ? 'text' : 'password'} name='password' value={userData.password} onChange={handleChange} placeholder='Password' className='w-full h-11 outline-0 ml-5 pr-4' />
              {
                showPassword
                ? <FaEyeSlash className='text-gray-600' onClick={() => setShowPassword(false)} />
                : <FaEye className='text-gray-600' onClick={() => setShowPassword(true)} />
              }
            </div>
            <Link to='/forget' className='text-gray-600'>Forget password?</Link>
          </div>
          <div className='flex items-center justify-between'>
            <button className='bg-blue-500 text-white rounded-full w-24 h-10 hover:bg-blue-700 transition-[background]'>Sign In</button>
            <Link to='/register' className='bg-gray-100 w-36 block h-10 text-center leading-10 rounded-full hover:bg-gray-200 transition-[background]'>Create Account</Link>
          </div>
        </form>
        <div className='text-center'>
          <p className='text-sm text-gray-500 font-medium mb-5'>Or Sign In With</p>
          <div className='flex justify-center items-center'>
            <div className='w-fit'>
              <GoogleLogin
                client_id={GOOGLE_CLIENT_ID}
                cookiepolicy='single_host_origin'
                onSuccess={onGoogleSuccess}
              />
            </div>
            <div className='ml-5'>
              <FacebookLogin
                appId={FACEBOOK_APP_ID}
                onSuccess={onFacebookSuccess}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='w-full flex-[2] pointer-events-none'>
        <img src={`${process.env.PUBLIC_URL}/images/authentication.png`} alt='Inspace Authentication' className='w-full h-screen object-cover' />
      </div>
    </div>
  )
}

export default Login