import { FaMicrophone } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'

const RecorderContainer = ({ time, stop, data, start, recording, setIsOnMicrophone }) => {
  return (
    <div className='border-t-2 py-3 px-5 h-60 flex items-center justify-center relative flex-col'>
      <div className='absolute top-5 right-5'>
        <AiOutlineClose className='text-2xl text-red-500 cursor-pointer' onClick={() => setIsOnMicrophone(false)} />
      </div>
      <div className='rounded-full bg-[rgba(0,0,0,.04)] w-[120px] h-[120px] flex items-center justify-center cursor-pointer'>
        <FaMicrophone
          className={`text-6xl ${recording ? 'text-red-400' : 'text-gray-400'}`}
          onClick={() => {
            if (recording) {
              stop();
            } else {
              start();
            }
          }}
        />
      </div>
      {
        recording &&
        <p className='mt-3'>{time.h} : {time.m} : {time.s}</p>
      }
    </div>
  )
}

export default RecorderContainer