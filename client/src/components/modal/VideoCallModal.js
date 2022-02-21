import { HiPhoneMissedCall } from 'react-icons/hi'

const VideoCallModal = ({ answer, call, yourVideo, otherVideo, hour, min, second, handleEndCall }) => {
  return (
    <div className={`bg-[rgba(0,0,0,.7)] fixed top-0 right-0 bottom-0 left-0 z-[9999] p-5 flex items-center justify-center ${answer && call.video ? 'block' : 'hidden'}`}>
      <div className='bg-white w-full max-w-[800px] p-8 flex items-center justify-center flex-col rounded-lg shadow-2xl'>
        <div className='flex items-center justify-between w-full gap-6'>
          <div className='border flex-1'>
            <video ref={yourVideo} />
          </div>
          <div className='border flex-1'>
            <video ref={otherVideo} />
          </div>
        </div>
        <div className='mt-4 flex items-center gap-2'>
          <p>{hour.toString().length > 1 ? hour : '0' + hour}</p>
          <p>:</p>
          <p>{min.toString().length > 1 ? min : '0' + min}</p>
          <p>:</p>
          <p>{second.toString().length > 1 ? second : '0' + second}</p>
        </div>
        <div className='bg-red-500 rounded-full mt-5 cursor-pointer hover:bg-red-400' onClick={handleEndCall}>
          <HiPhoneMissedCall className='text-white text-5xl p-3' />
        </div>
      </div>
    </div>
  )
}

export default VideoCallModal