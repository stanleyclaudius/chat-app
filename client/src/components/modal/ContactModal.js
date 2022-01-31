import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'
import PersonCard from './../general/PersonCard'

const ContactModal = ({ openContactListModal, setOpenContactListModal }) => {
  return (
    <div className={`${openContactListModal ? 'opacity-100' : 'opacity-0'} ${openContactListModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity fixed top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,.6)] z-[9999] flex items-center justify-center p-5`}>
      <div className={`${openContactListModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[900px] bg-white rounded-md`}>
        <div className='flex items-center justify-between py-3 px-5 border-b-2'>
          <h1 className='text-xl'>Contact List</h1>
          <AiOutlineClose className='cursor-pointer text-xl' onClick={() => setOpenContactListModal(false)} />
        </div>
        <div className='py-5 px-5'>
          <div className='flex items-center justify-between border border-gray-500 w-fit rounded-md p-2 md:w-[400px] w-[100%] float-right'>
            <input type='text' placeholder='Search contact ...' autoComplete='off' className='outline-0' />
            <AiOutlineSearch className='text-gray-500 text-lg' />
          </div>
          <div className="clear-both"></div>
          <div className='mt-6 grid grid-cols-auto-fill gap-5'>
            <PersonCard />
            <PersonCard />
            <PersonCard />
            <PersonCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactModal