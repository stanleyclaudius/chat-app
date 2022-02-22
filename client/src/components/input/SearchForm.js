import { AiOutlineSearch } from 'react-icons/ai'

const SearchForm = ({ placeholder, value, onChange, disabled }) => {
  return (
    <form onSubmit={e => e.preventDefault()} className='border-b-2 flex items-center justify-between pr-3'>
      <input type='text' placeholder={placeholder} value={value} onChange={onChange} className='w-full h-12 outline-0 px-3' disabled={disabled} />
      <AiOutlineSearch className='text-xl text-gray-500' />
    </form>
  )
}

export default SearchForm