import { useState, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FaRegUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getDataAPI, patchDataAPI } from './../../utils/fetchData'
import { GLOBAL_TYPES } from './../../redux/types/globalTypes'
import { checkTokenValidity } from './../../utils/checkTokenValidity'
import Avatar from './../general/Avatar'
import Loader from './../general/Loader'

const SearchPeopleModal = ({ searchPeopleRef, openSearchPeopleModal, setOpenSearchPeopleModal }) => {
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingAddFriend, setLoadingAddFriend] = useState(false)
  const [result, setResult] = useState({})
  const [isFriend, setIsFriend] = useState(false)

  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!userId) {
      setResult({})
      return dispatch({ type: GLOBAL_TYPES.ALERT, payload: {errors: 'Please provide User ID.'} })
    }

    const tokenValidityResult = await checkTokenValidity(auth.token, dispatch)
    const accessToken = tokenValidityResult ? tokenValidityResult : auth.token

    setLoading(true)
    await getDataAPI(`user/id/${userId}`, accessToken)
      .then(res => setResult(res.data))
      .catch(err => {
        setResult({})
        return dispatch({ type: GLOBAL_TYPES.ALERT, payload: {errors: err.response.data.msg} })
      })
    setLoading(false)
  }

  const addFriend = async id => {
    const tokenValidityResult = await checkTokenValidity(auth.token, dispatch)
    const accessToken = tokenValidityResult ? tokenValidityResult : auth.token
    
    setLoadingAddFriend(true)
    await patchDataAPI(`user/add/${id}`, {}, accessToken)
      .then(res => {
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: {success: res.data.msg} })
        dispatch({
          type: GLOBAL_TYPES.AUTH,
          payload: {
            user: {
              ...auth.user,
              friends: [
                {
                  _id: res.data.user._id,
                  name: res.data.user.name,
                  avatar: res.data.user.avatar,
                  userId: res.data.user.userId
                },
                ...auth.user?.friends
              ]
            },
            token: accessToken
          }
        })
        setResult({})
        setUserId('')
        setOpenSearchPeopleModal(false)
      })
      .catch(err => dispatch({ type: GLOBAL_TYPES.ALERT, payload: {errors: err.response.data.msg} }))
    setLoadingAddFriend(false)
  }

  useEffect(() => {
    if (Object.keys(result).length > 0) {
      const findUser = auth.user?.friends.find(item => item._id === result._id)
      if (findUser)
        setIsFriend(true)
    }
  }, [result, auth.user?.friends])

  return (
    <div className={`${openSearchPeopleModal ? 'opacity-100' : 'opacity-0'} ${openSearchPeopleModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.6)] flex items-center justify-center p-5 z-[9999]`}>
      <div ref={searchPeopleRef} className={`${openSearchPeopleModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[400px] bg-white rounded-md`}>
        <div className='flex items-center justify-between px-5 py-3 border-b-2'>
          <h1 className='text-xl'>Search People</h1>
          <AiOutlineClose className='text-xl cursor-pointer' onClick={() => setOpenSearchPeopleModal(oldValue => !oldValue)} />
        </div>
        <div className='p-5'>
          <form onSubmit={handleSubmit}>
            <div className='w-full border-2 rounded-md py-2 px-3 flex items-center'>
              <FaRegUser className='text-gray-500 mr-3' />
              <input type='text' placeholder='User ID' autoComplete='off' value={userId.replace(' ', '')} onChange={e => setUserId(e.target.value)} className='w-full outline-0' />
            </div>
            <button type='submit' className={`${loading ? 'bg-blue-300' : 'bg-blue-500'} mt-4 ${!loading ? 'hover:bg-blue-600' : undefined} transition-[background] w-20 h-9 text-white rounded-md float-right ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={loading ? true : false}>
              {
                loading
                ? <Loader />
                : 'Search'
              }
            </button>
            <div className='clear-both' />
          </form>
          
          {
            Object.keys(result).length > 0 &&
            <div className='text-center border-2 shadow-lg w-fit m-auto rounded-md p-4 mt-6'>
              <div className='flex justify-center'>
                <Avatar src={result?.avatar} alt={result?.name} />
              </div>
              <h1 className='text-lg my-3'>{result?.name}</h1>
              {
                result?._id !== auth.user?._id &&
                <button className={`${loadingAddFriend ? 'bg-blue-300' : 'bg-blue-500'} ${!loadingAddFriend ? 'hover:bg-blue-600' : undefined} ${loading ? 'cursor-not-allowed' : 'cursor-pointer'} text-sm transition-[background] w-20 h-8 text-white rounded-md`} disabled={loadingAddFriend ? true : false} onClick={() => addFriend(result?.userId)}>
                  {
                    loadingAddFriend
                    ? <Loader />
                    : isFriend ? 'Chat' : 'Add Friend'
                  }
                </button>
              }
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default SearchPeopleModal