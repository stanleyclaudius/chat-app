import { useState } from 'react'
import { AiOutlineWechat } from 'react-icons/ai'
import { IoChevronBackOutline } from 'react-icons/io5'
import ChatInput from './../components/input/ChatInput'
import SearchForm from './../components/input/SearchForm'
import MessageContainer from '../components/message/MessageContainer'
import ContactContainer from '../components/global/ContactContainer'
import Avatar from './../components/global/Avatar'

const Dashboard = () => {
  const [selectContact, setSelectContact] = useState(false)

  return (
    <>
      <div className='flex items-center justify-between border-b-2 py-1 md:px-12 px-4 sticky top-0'>
        <div className='flex items-center'>
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt='Inspace' width='35' />
          <h1 className='md:block hidden font-logo text-lg ml-4'>Inspace</h1>
        </div>
        <div className='text-center'>
          <div className='flex items-center'>
            {selectContact && <IoChevronBackOutline className='md:hidden block translate-y-[2px] cursor-pointer' onClick={() => setSelectContact(false)} />}
            <h2 className='text-lg font-medium ml-2'>Lorem Ipsum</h2>
          </div>
          <p>Message</p>
        </div>
        <div className='flex items-center'>
          <p className='mr-5 md:block hidden'>Lorem Ipsum</p>
          <Avatar size='20px' />
        </div>
      </div>
      <div className='md:flex md:static relative overflow-x-hidden'>
        <div className='md:flex-1 md:border-r-2'>
          <div>
            <SearchForm placeholder='Search contact ...' />
            <ContactContainer setSelectContact={setSelectContact} />
          </div>
        </div>
        <div className={`md:flex-[3] md:static transition-all duration-200 absolute top-0 bottom-0 h-[100%] bg-white md:h-[90vh] w-full flex flex-col ${selectContact ? 'right-0' : '-right-[5000px]'}`}>
          {
            selectContact
            ? (
              <>
                <MessageContainer />
                <ChatInput />
              </>
            )
            : (
              <div className='flex items-center justify-center flex-col h-full animate-bounce'>
                <AiOutlineWechat className='text-gray-400 text-9xl' />
                <h1 className='text-3xl text-gray-400 mt-5 font-medium'>Select Friends To Chat With</h1>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Dashboard