import { AiOutlineSearch } from 'react-icons/ai'

const SearchForm = ({ placeholder }) => {
  return (
    <form className='border-b-2 flex items-center justify-between pr-3'>
      <input type='text' placeholder={placeholder} className='w-full h-12 outline-0 px-3' />
      <AiOutlineSearch className='text-xl text-gray-500' />
    </form>
  )
}

export default SearchForm