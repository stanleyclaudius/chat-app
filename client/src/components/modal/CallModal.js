import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HiPhoneMissedCall } from 'react-icons/hi'
import { IoIosCall, IoIosVideocam } from 'react-icons/io'
import { GLOBAL_TYPES } from './../../redux/types/globalTypes'
import Avatar from './../general/Avatar'

const CallModal = () => {
  const [min, setMin] = useState(0)
  const [second, setSecond] = useState(0)
  const [total, setTotal] = useState(0)
  const [answer, setAnswer] = useState(false)

  const dispatch = useDispatch()
  const { call } = useSelector(state => state)

  const handleAnswer = () => {
    setAnswer(true)
  }

  const handleEndCall = () => {
    dispatch({ type: GLOBAL_TYPES.CALL, payload: null })
  }

  useEffect(() => {
    const setTime = () => {
      setTotal(t => t + 1)
      setTimeout(setTime, 1000)
    }
    setTime()

    return () => setTotal(0)
  }, [])

  useEffect(() => {
    setSecond(total % 60)
    setMin(parseInt(total / 60))
  }, [total])

  useEffect(() => {
    if (answer) {
      setTotal(0)
    } {
      const timer = setTimeout(() => {
        dispatch({ type: GLOBAL_TYPES.CALL, payload: null })
      }, 15000)

      return () => clearTimeout(timer)
    }
  }, [dispatch, answer])

  return (
    <div className='bg-[rgba(0,0,0,.7)] fixed top-0 right-0 bottom-0 left-0 z-[999] p-5 flex items-center justify-center'>
      <div className='bg-white w-full max-w-[350px] p-8 flex items-center justify-center flex-col rounded-lg shadow-2xl'>
        <Avatar src={call.avatar} alt={call.name} />
        <h1 className='font-medium text-xl mt-5'>{call.name}</h1>
        <p className='mt-8'>{call.video ? 'Video Call' : 'Audio Call'}</p>
        <div className='mt-4 flex items-center gap-2'>
          <p>{min.toString().length > 1 ? min : '0' + min}</p>
          <p>:</p>
          <p>{second.toString().length > 1 ? second : '0' + second}</p>
        </div>
        <div className='flex items-center mt-8 gap-8'>
          <div className='bg-green-500 rounded-full cursor-pointer hover:bg-green-400'>
            {
              call.video
              ? <IoIosVideocam className='text-white text-5xl p-3' onClick={handleAnswer} />
              : <IoIosCall className='text-white text-5xl p-3' onClick={handleAnswer} />
            }
          </div>
          <div className='bg-red-500 rounded-full cursor-pointer hover:bg-red-400'>
            <HiPhoneMissedCall onClick={handleEndCall}className='text-white text-5xl p-3' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallModal