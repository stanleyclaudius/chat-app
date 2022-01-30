import { useState } from 'react'
import { GoKebabVertical } from 'react-icons/go'
import { IoChevronBackOutline } from 'react-icons/io5'
import ChatInput from './../components/message/ChatInput'
import Avatar from './../components/global/Avatar'
import ContactCard from './../components/global/ContactCard'
import SearchForm from './../components/global/SearchForm'

const Dashboard = () => {
  const [selectContact, setSelectContact] = useState(false)

  return (
    <div className='relative'>
      <div>
        <div className='w-full h-24 bg-gradient-to-r from-[#87CBFF] to-[#26A2EE] flex items-center p-6 justify-between'>
          <div className='flex items-center cursor-pointer'>
            <Avatar />
            <div className='ml-5'>
              <p className='text-white font-medium text-2xl'>Lorem Ipsum</p>
              <p className='text-white mt-2'>Status goes here</p>
            </div>
          </div>
          <div>
            <GoKebabVertical className='text-white text-2xl cursor-pointer' />
          </div>
        </div>
        <div className='p-6'>
          <SearchForm
            placeholder='Search contact ...'
          />
          <div className='md:h-[70vh] h-[73vh] overflow-auto contact-container'>
            <ContactCard
              onClick={() => setSelectContact(true)}
            />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
          </div>
        </div>
      </div>
      <div className={`${!selectContact ? 'hidden' : 'block'} absolute top-0 bg-white h-screen w-full flex flex-col`}>
        <div className='w-full h-24 bg-gradient-to-r from-[#87CBFF] to-[#26A2EE] flex items-center p-6 justify-between'>
          <div className='flex items-center'>
            <IoChevronBackOutline onClick={() => setSelectContact(false)} className='text-2xl mr-3 text-white' />
            <Avatar />
            <div className='ml-5'>
              <p className='text-white font-medium text-2xl'>Lorem Ipsum</p>
              <p className='text-white mt-2'>Status goes here</p>
            </div>
          </div>
          <div>
            <GoKebabVertical className='text-white text-2xl cursor-pointer' />
          </div>
        </div>
        <div className='flex-1 px-5 py-7'>
          <div className='mb-7 flex items-end justify-end flex-col'>
            <div className='w-80 float-right break-all bg-[#41AEF3] text-white p-3 rounded-md mb-2'>
              hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello
            </div>
            <p className='text-gray-400'>30/01/2022; 3:01PM</p>
          </div>
          <div className='mb-7 flex items-start justify-start flex-col'>
            <div className='w-80 bg-gray-100 break-all p-3 rounded-md mb-2'>
              hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello
            </div>
            <p className='text-gray-400'>30/01/2022; 3:01PM</p>
          </div>
          <div className='mb-7 flex items-end justify-end flex-col'>
            <div className='w-80 float-right break-all bg-[#41AEF3] text-white p-3 rounded-md mb-2'>
              hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello
            </div>
            <p className='text-gray-400'>30/01/2022; 3:01PM</p>
          </div>
        </div>
        <div className='border-t-2 py-3 px-5'>
          <ChatInput />
        </div>
      </div>
    </div>
  )
}

export default Dashboard