import { AiOutlineSearch } from 'react-icons/ai'

const SearchForm = ({ placeholder }) => {
  return (
    <form className='border border-gray-500 rounded-md flex items-center justify-between mb-7 pr-3'>
      <input type='text' placeholder={placeholder} className='w-full h-12 outline-0 px-3' />
      <AiOutlineSearch className='text-xl' />
    </form>
  )
}

export default SearchForm