import { HiPhoneMissedCall } from 'react-icons/hi'

const VideoCallModal = ({ openVideoCallModal, setOpenVideoCallModal }) => {
  return (
    <div className={`${openVideoCallModal ? 'opacity-100' : 'opacity-0'} ${openVideoCallModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity bg-[rgba(0,0,0,.7)] fixed top-0 right-0 bottom-0 left-0 z-50 p-5 flex items-center justify-center`}>
      <div className={`${openVideoCallModal ? 'translate-y-0' : '-translate-y-12'} transition-transform bg-white w-full max-w-[800px] p-8 flex items-center justify-center flex-col rounded-lg shadow-2xl`}>
        <div className='flex items-center justify-between w-full gap-6'>
          <div className='border flex-1'>
            my video
          </div>
          <div className='border flex-1'>
            others video
          </div>
        </div>
        <p className='mt-6'>Video Call</p>
        <p className='mt-4 text-xl'>10 : 10 : 10</p>
        <div className='bg-red-500 rounded-full mt-5 cursor-pointer hover:bg-red-400' onClick={() => setOpenVideoCallModal(false)}>
          <HiPhoneMissedCall className='text-white text-5xl p-3' />
        </div>
      </div>
    </div>
  )
}

export default VideoCallModal