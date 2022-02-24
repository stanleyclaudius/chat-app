import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRecorder } from 'voice-recorder-react'
import { FaMicrophone } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { createMessage } from './../../redux/actions/messageActions'

const RecorderContainer = ({ selectContact, setIsOnMicrophone }) => {
  const [audioFile, setAudioFile] = useState('')

  const dispatch = useDispatch()
  const { auth, socket } = useSelector(state => state)

  const {
    stop,
    data,
    time,
    start,
    recording
  } = useRecorder()

  const blobToBase64 = blob => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result)
      }
    })
  }

  const handleToggleMicrophone = () => {
    if (recording) {
      stop()
    } else {
      start()
    }
  }

  const uploadToCloudinary = useCallback(async() => {
    await blobToBase64(data.blob)
      .then(res => setAudioFile(res))

    const formData = new FormData()
    formData.append('file', audioFile)
    formData.append('upload_preset', 'qdrd1akc')
    formData.append('cloud_name', 'dpef9sjqt')

    const res = await fetch('https://api.cloudinary.com/v1_1/dpef9sjqt/upload', {
      method: 'POST',
      body: formData
    })

    const audioResult = await res.json()
    
    if (audioResult.secure_url) {
      const chatData = {
        sender: auth.user,
        recipient: selectContact,
        text: '',
        media: [],
        audio: audioResult.secure_url,
        files: [],
        isRead: false,
        call: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
  
      dispatch(createMessage(chatData, auth.token, socket))
    }
  }, [data, audioFile, dispatch, auth, socket, selectContact])

  useEffect(() => {
    if (data.url) {
      uploadToCloudinary()
    }
  }, [data.url, uploadToCloudinary])
  
  return (
    <div className='border-t-2 py-3 px-5 h-60 flex items-center justify-center relative flex-col'>
      <div className='absolute top-5 right-5'>
        <AiOutlineClose className='text-2xl text-red-500 cursor-pointer' onClick={() => setIsOnMicrophone(false)} />
      </div>
      <div className='rounded-full bg-[rgba(0,0,0,.04)] w-[120px] h-[120px] flex items-center justify-center cursor-pointer'>
        <FaMicrophone
          className={`text-6xl ${recording ? 'text-red-400' : 'text-gray-400'}`}
          onClick={handleToggleMicrophone}
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