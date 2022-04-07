import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { GLOBAL_TYPES } from './../../redux/types/globalTypes'
import { editProfile } from './../../redux/actions/authActions'
import Loader from './../general/Loader'

const EditProfileModal = ({ editProfileRef, openEditProfileModal, setOpenEditProfileModal }) => {
  const [userData, setUserData] = useState({
    name: '',
    userId: ''
  })
  const [avatar, setAvatar] = useState()
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  const handleChangeInput = e => {
    const { name, value } = e.target
    setUserData({...userData, [name]: value})
  }

  const handleChangeImage = e => {
    const file = e.target.files[0]
    setAvatar(file)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!userData.name)
      return dispatch({ type: GLOBAL_TYPES.ALERT, payload: {errors: 'Please provide your name.'} })

    setLoading(true)
    await dispatch(editProfile(userData, avatar, auth))
    setLoading(false)
    setAvatar()
    setOpenEditProfileModal(false)
  }

  useEffect(() => {
    if (auth.user) {
      setUserData({
        name: auth.user?.name,
        userId: auth.user?.userId
      })
    }
  }, [auth.user])

  return (
    <div className={`${openEditProfileModal ? 'opacity-100' : 'opacity-0'} ${openEditProfileModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-[rgba(0,0,0,.6)] p-5 z-[9999]`}>
      <div ref={editProfileRef} className={`${openEditProfileModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[450px] bg-white rounded-md`}>
        <div className='flex items-center justify-between py-3 px-5 border-b-2'>
          <h1 className='text-xl'>Edit Profile</h1>
          <AiOutlineClose className='text-xl cursor-pointer' onClick={() => setOpenEditProfileModal(oldValue => !oldValue)} />
        </div>
        <div className='p-5'>
          <form onSubmit={handleSubmit}>
            <div className='mb-6 flex items-start'>
              <div className='flex-1 mr-3 border-2 shadow-lg rounded-md h-28'>
                <img
                  src={avatar ? URL.createObjectURL(avatar) : auth.user?.avatar}
                  alt={auth.user?.name}
                  className='rounded-md object-cover w-full h-full' 
                />
              </div>
              <input type='file' accept='image/*' className='flex-3 border rounded-md outline-0' onChange={handleChangeImage} />
            </div>
            <div className='mb-6'>
              <label htmlFor='name'>Name</label>
              <input type='text' id='name' name='name' className='border border-gray-400 rounded-md w-full h-9 mt-2 outline-0 px-2' autoComplete='off' value={userData.name} onChange={handleChangeInput} />
            </div>
            <div className='mb-6'>
              <label htmlFor='userId'>User ID</label>
              <input type='text' id='userId' name='userId' className='border border-gray-400 rounded-md w-full h-9 mt-2 outline-0 px-2' autoComplete='off' value={userData.userId} onChange={e => setUserData({...userData, userId: e.target.value.replace(' ', '')})} />
            </div>
            <button type='submit' className={`${loading ? 'bg-blue-300' : 'bg-blue-500'} ${!loading ? 'hover:bg-blue-600' : undefined} transition-[background] text-white rounded-md h-9 w-24 float-right text-sm ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={loading ? true : false}>
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

export default EditProfileModal