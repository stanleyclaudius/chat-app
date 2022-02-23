const Loader = ({ xl }) => {
  return (
    <div className={`animate-spin border-2 border-white ${xl ? 'w-[50px] h-[50px]' : 'w-[25px] h-[25px]'} rounded-full border-t-2 border-t-gray-400 m-auto`} />
  )
}

export default Loader