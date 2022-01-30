import { GoKebabVertical } from 'react-icons/go'
import Avatar from './../components/global/Avatar'
import ContactCard from './../components/global/ContactCard'
import SearchForm from './../components/global/SearchForm'

const Dashboard = () => {
  return (
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
          <ContactCard />
        </div>
      </div>
    </div>
  )
}

export default Dashboard