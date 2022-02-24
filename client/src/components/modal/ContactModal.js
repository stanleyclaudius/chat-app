import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'
import { getDataAPI } from './../../utils/fetchData'
import { checkTokenValidity } from './../../utils/checkTokenValidity'
import PersonCard from './../general/PersonCard'

const ContactModal = ({ contactListRef, openContactListModal, setOpenContactListModal, setSelectContact }) => {
  const [search, setSearch] = useState('')
  const [friendList, setFriendList] = useState([])

  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  const searchFriend = useCallback(async () => {
    const tokenValidityResult = await checkTokenValidity(auth.token, dispatch)
    const accessToken = tokenValidityResult ? tokenValidityResult : auth.token

    await getDataAPI(`user/search?name=${search}`, accessToken)
      .then(res => setFriendList(res.data.user))
      .catch(err => console.log(err.response.data.msg))
  }, [search, auth.token, dispatch])

  useEffect(() => {
    if (search.length > 3)
      searchFriend()
    else
      setFriendList(auth.user?.friends)
  }, [searchFriend, auth.user, search])

  useEffect(() => {
    setFriendList(auth.user?.friends)
  }, [auth.user])

  return (
    <div className={`${openContactListModal ? 'opacity-100' : 'opacity-0'} ${openContactListModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity fixed top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,.6)] z-[9999] flex items-center justify-center p-5`}>
      <div ref={contactListRef} className={`${openContactListModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[900px] bg-white rounded-md`}>
        <div className='flex items-center justify-between py-3 px-5 border-b-2'>
          <h1 className='text-xl'>Contact List</h1>
          <AiOutlineClose className='cursor-pointer text-xl' onClick={() => setOpenContactListModal(oldState => !oldState)} />
        </div>
        <div className='py-5 px-5'>
          <div className='flex items-center justify-between border border-gray-500 w-fit rounded-md p-2 md:w-[400px] w-[100%] float-right'>
            <input type='text' placeholder='Search contact ...' autoComplete='off' className='outline-0 w-full pr-2' value={search} onChange={e => setSearch(e.target.value)} />
            <AiOutlineSearch className='text-gray-500 text-lg' />
          </div>
          <div className="clear-both"></div>
          {
            friendList.length === 0
            ? (
              <div className='bg-red-400 text-white rounded-md p-2 text-center mt-6'>
                Friend not found
              </div>
            )
            : (
              <div className='mt-6 grid grid-cols-auto-fill gap-5'>
                {
                  friendList.map(friend => (
                    <PersonCard key={friend._id} id={friend._id}avatar={friend.avatar} name={friend.name} setOpenContactListModal={setOpenContactListModal} setSelectContact={setSelectContact} />
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ContactModal