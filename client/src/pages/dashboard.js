import { useState } from 'react'
import { AiOutlineWechat } from 'react-icons/ai'
import ChatInput from './../components/input/ChatInput'
import SearchForm from './../components/input/SearchForm'
import MessageContainer from '../components/message/MessageContainer'
import Header from '../components/global/Header'
import ContactContainer from '../components/global/ContactContainer'

const Dashboard = () => {
  const [selectContact, setSelectContact] = useState(false)

  return (
    <div className='md:flex relative overflow-x-hidden'>
      <div className='md:flex-1 md:border-r-2'>
        <Header
          type='own'
          name='Lorem Ipsum'
          status='Status goes here'
        />
        <div className='p-6'>
          <SearchForm placeholder='Search contact ...' />
          <ContactContainer setSelectContact={setSelectContact} />
        </div>
      </div>
      <div className={`md:flex-[3] md:static transition-all duration-200 absolute top-0 bg-white h-[100vh] w-full flex flex-col ${selectContact ? 'right-0' : '-right-[1500px]'}`}>
        {
          selectContact
          ? (
            <>
              <Header
                type='others'
                name='Lorem Ipsum'
                status='Active Now'
                setSelectContact={setSelectContact}
              />
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
  )
}

export default Dashboard