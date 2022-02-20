import { HiPhoneMissedCall } from 'react-icons/hi'
import Avatar from '../general/Avatar'

const AudioCallModal = ({ openAudioCallModal, setOpenAudioCallModal }) => {
  return (
    <div className={`${openAudioCallModal ? 'opacity-100' : 'opacity-0'} ${openAudioCallModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity bg-[rgba(0,0,0,.7)] fixed top-0 right-0 bottom-0 left-0 z-50 p-5 flex items-center justify-center`}>
      <div className={`${openAudioCallModal ? 'translate-y-0' : '-translate-y-12'} transition-transform bg-white w-full max-w-[350px] p-8 flex items-center justify-center flex-col rounded-lg shadow-2xl`}>
        <Avatar />
        <h1 className='font-medium text-xl mt-5'>Idah</h1>
        <p className='mt-8'>Audio Call</p>
        <p className='mt-4 text-xl'>10 : 10 : 10</p>
        <div className='bg-red-500 rounded-full mt-8 cursor-pointer hover:bg-red-400' onClick={() => setOpenAudioCallModal(false)}>
          <HiPhoneMissedCall className='text-white text-5xl p-3' />
        </div>
      </div>
    </div>
  )
}

export default AudioCallModal