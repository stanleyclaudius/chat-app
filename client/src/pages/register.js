import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BiLock } from 'react-icons/bi'
import { FaRegUser, FaEye, FaEyeSlash } from 'react-icons/fa'

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

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
        <h1 className='text-3xl font-medium mb-7'>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className='border border-gray-500 flex items-center rounded-md px-3 mb-7'>
            <FaRegUser className='text-gray-500' />
            <input type='text' name='name' value={userData.name} onChange={handleChange} placeholder='Name' autoComplete='off' className='ml-5 w-full h-11 outline-0' />
          </div>
          <div className='border border-gray-500 flex items-center rounded-md px-3 mb-7'>
            <FaRegUser className='text-gray-500' />
            <input type='text' name='email' value={userData.email} onChange={handleChange} placeholder='Email Address' autoComplete='off' className='ml-5 w-full h-11 outline-0' />
          </div>
          <div className='border border-gray-500 flex items-center rounded-md px-3 pr-5 mb-7'>
            <BiLock className='text-gray-500 text-xl' />
            <input type={showPassword ? 'text' : 'password'} name='password' value={userData.password} onChange={handleChange} placeholder='Password' className='w-full h-11 outline-0 ml-5 pr-4' />
            {
              showPassword
              ? <FaEyeSlash className='text-gray-600 cursor-pointer' onClick={() => setShowPassword(false)} />
              : <FaEye className='text-gray-600 cursor-pointer' onClick={() => setShowPassword(true)} />
            }
          </div>
          <div className='border border-gray-500 flex items-center rounded-md px-3 pr-5 mb-7'>
            <BiLock className='text-gray-500 text-xl' />
            <input type={showPasswordConfirmation ? 'text' : 'password'} name='passwordConfirmation' value={userData.passwordConfirmation} onChange={handleChange} placeholder='Password Confirmation' className='w-full h-11 outline-0 ml-5 pr-4' />
            {
              showPasswordConfirmation
              ? <FaEyeSlash className='text-gray-600 cursor-pointer' onClick={() => setShowPasswordConfirmation(false)} />
              : <FaEye className='text-gray-600 cursor-pointer' onClick={() => setShowPasswordConfirmation(true)} />
            }
          </div>
          <div className='flex items-center justify-between mt-10'>
            <button className='bg-blue-500 text-white rounded-full w-24 h-10 hover:bg-blue-700 transition-[background]'>Sign Up</button>
            <Link to='/login' className='bg-gray-100 w-24 block h-10 text-center leading-10 rounded-full hover:bg-gray-200 transition-[background]'>Login</Link>
          </div>
        </form>
      </div>
      <div className='w-full flex-[2] pointer-events-none'>
        <img src={`${process.env.PUBLIC_URL}/images/authentication.png`} alt='Inspace Authentication' className='w-full h-screen object-cover' />
      </div>
    </div>
  )
}

export default Register