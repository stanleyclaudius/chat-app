import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IoChevronBackOutline } from 'react-icons/io5'
import { AiFillWechat, AiOutlineSearch } from 'react-icons/ai'
import { FaEdit } from 'react-icons/fa'
import { BiLock } from 'react-icons/bi'
import { MdLogout } from 'react-icons/md'
import { RiPhoneFill } from 'react-icons/ri'
import { IoVideocam } from 'react-icons/io5'
import { GLOBAL_TYPES } from './../../redux/types/globalTypes'
import { logout } from './../../redux/actions/authActions'
import ContactModal from './../modal/ContactModal'
import SearchPeopleModal from './../modal/SearchPeopleModal'
import EditProfileModal from './../modal/EditProfileModal'
import ChangePasswordModal from './../modal/ChangePasswordModal'
import Avatar from './Avatar'

const Header = ({ selectContact, setSelectContact }) => {
  const [openDropdown, setOpenDropdown] = useState(false)
  const [openContactListModal, setOpenContactListModal] = useState(false)
  const [openSearchPeopleModal, setOpenSearchPeopleModal] = useState(false)
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false)
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false)
  const [notFriend, setNotFriend] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { auth, socket, peer } = useSelector(state => state)

  const dropdownRef = useRef()
  const contactListRef = useRef()
  const searchPeopleRef = useRef()
  const editProfileRef = useRef()
  const changePasswordRef = useRef()

  const handleLogout = async() => {
    await dispatch(logout(auth.token, socket))
    navigate('/')
  }

  const caller = ({ video }) => {
    const { _id, avatar, name } = selectContact
    const msg = {
      sender: auth.user?._id,
      recipient: _id,
      avatar: auth.user?.avatar,
      name: auth.user?.name,
      video,
      recipientName: name,
      recipientAvatar: avatar
    }
    dispatch({ type: GLOBAL_TYPES.CALL, payload: msg })
  }

  const callUser = ({ video }) => {
    const { _id, avatar, name } = auth.user

    const msg = {
      sender: _id,
      recipient: selectContact._id,
      avatar,
      name,
      video,
      recipientName: selectContact.name,
      recipientAvatar: selectContact.avatar
    }

    if (peer.open) msg.peerId = peer._id

    socket.emit('callUser', msg)
  }

  const handleAudioCall = () => {
    caller({ video: false })
    callUser({ video: false })
  }

  const handleVideoCall = () => {
    caller({ video: true })
    callUser({ video: true })
  }

  useEffect(() => {
    if (selectContact) {
      const findUser = auth.user?.friends.find(item => item._id === selectContact._id)
      if (!findUser)
        setNotFriend(true)
    }
  }, [selectContact, auth.user?.friends])

  useEffect(() => {
    const checkIflickedOutside = e => {
      if (openDropdown && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false)
      }
    }

    document.addEventListener('mousedown', checkIflickedOutside)
    return () => document.removeEventListener('mousedown', checkIflickedOutside)
  }, [openDropdown])

  useEffect(() => {
    const checkIflickedOutside = e => {
      if (SearchPeopleModal && searchPeopleRef.current && !searchPeopleRef.current.contains(e.target)) {
        setOpenSearchPeopleModal(false)
      }
    }

    document.addEventListener('mousedown', checkIflickedOutside)
    return () => document.removeEventListener('mousedown', checkIflickedOutside)
  }, [openSearchPeopleModal])

  useEffect(() => {
    const checkIflickedOutside = e => {
      if (openContactListModal && contactListRef.current && !contactListRef.current.contains(e.target)) {
        setOpenContactListModal(false)
      }
    }

    document.addEventListener('mousedown', checkIflickedOutside)
    return () => document.removeEventListener('mousedown', checkIflickedOutside)
  }, [openContactListModal])

  useEffect(() => {
    const checkIflickedOutside = e => {
      if (openEditProfileModal && editProfileRef.current && !editProfileRef.current.contains(e.target)) {
        setOpenEditProfileModal(false)
      }
    }

    document.addEventListener('mousedown', checkIflickedOutside)
    return () => document.removeEventListener('mousedown', checkIflickedOutside)
  }, [openEditProfileModal])

  useEffect(() => {
    const checkIflickedOutside = e => {
      if (openChangePasswordModal && changePasswordRef.current && !changePasswordRef.current.contains(e.target)) {
        setOpenChangePasswordModal(false)
      }
    }

    document.addEventListener('mousedown', checkIflickedOutside)
    return () => document.removeEventListener('mousedown', checkIflickedOutside)
  }, [openChangePasswordModal])

  return (
    <>
      <div className='bg-white flex items-center justify-between border-b-2 py-1 md:px-12 sticky top-0 px-4 z-[50]'>
        <div className='flex items-center'>
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt='Inspace' width='35' />
          <h1 className='md:block hidden font-logo text-lg ml-4'>Inspace</h1>
        </div>
        {
          selectContact &&
          <div className='text-center'>
            <div className='flex items-center'>
              {selectContact && <IoChevronBackOutline className='md:hidden block translate-y-[2px] cursor-pointer' onClick={() => setSelectContact(false)} />}
              <h2 className='text-lg font-medium ml-2'>{selectContact.name} {notFriend && '(Not Friend)'}</h2>
            </div>
            <div className='flex items-center mt-1'>
              <p>Message</p>
              <RiPhoneFill className='ml-4 text-lg cursor-pointer' onClick={handleAudioCall} />
              <IoVideocam className='ml-4 text-lg cursor-pointer' onClick={handleVideoCall} />
            </div>
          </div>
        }
        <div className='flex items-center'>
          <p className='mr-5 md:block hidden'>{auth.user?.name}</p>
          <div className='relative'>
            <div className='cursor-pointer' onClick={() => setOpenDropdown(oldState => !oldState)}>
              <Avatar size='20px' src={auth.user?.avatar} alt={auth.user?.name} />
            </div>
            <div ref={dropdownRef} className={`border-2 transition-transform absolute origin-top translate-y-[10px] top-full right-0 w-[190px] bg-white drop-shadow-xl rounded-md ${openDropdown ? 'scale-y-100' : 'scale-y-0'}`}>
              <div className='flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b-2 rounded-tl-md rounded-tr-md' onClick={() => setOpenSearchPeopleModal(true)}>
                <AiOutlineSearch className='mr-2 translate-y-[1px]' />
                <p>Search People</p>
              </div>
              <div className='flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b-2' onClick={() => setOpenContactListModal(true)}>
                <AiFillWechat className='mr-2 translate-y-[1px]' />
                <p>Start Chatting</p>
              </div>
              <div className='flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b-2' onClick={() => setOpenEditProfileModal(true)}>
                <FaEdit className='mr-2 text-lg' />
                <p>Edit Profile</p>
              </div>
              {
                auth.user?.type === 'register' &&
                <div className='flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b-2' onClick={() => setOpenChangePasswordModal(true)}>
                  <BiLock className='mr-2 text-lg translate-y-[1px]' />
                  <p>Change Password</p>
                </div>
              }
              <div className='flex items-center p-3 hover:bg-gray-100 cursor-pointer rounded-bl-md rounded-br-md' onClick={handleLogout}>
                <MdLogout className='mr-2 translate-y-[2px] text-xl' />
                <p>Logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactModal contactListRef={contactListRef} openContactListModal={openContactListModal} setOpenContactListModal={setOpenContactListModal} setSelectContact={setSelectContact} />
      <SearchPeopleModal searchPeopleRef={searchPeopleRef} openSearchPeopleModal={openSearchPeopleModal} setOpenSearchPeopleModal={setOpenSearchPeopleModal} />
      <EditProfileModal editProfileRef={editProfileRef} openEditProfileModal={openEditProfileModal} setOpenEditProfileModal={setOpenEditProfileModal} />
      <ChangePasswordModal changePasswordRef={changePasswordRef} openChangePasswordModal={openChangePasswordModal} setOpenChangePasswordModal={setOpenChangePasswordModal} />
    </>
  )
}

export default Header