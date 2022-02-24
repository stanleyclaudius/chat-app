import { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HiPhoneMissedCall } from 'react-icons/hi'
import { IoIosCall, IoIosVideocam } from 'react-icons/io'
import { GLOBAL_TYPES } from './../../redux/types/globalTypes'
import { createMessage } from './../../redux/actions/messageActions'
import Avatar from './../general/Avatar'
import VideoCallModal from './VideoCallModal'
import Ringtone from './../../audio/ringtone.mp3'

const CallModal = () => {
  const [hour, setHour] = useState(0)
  const [min, setMin] = useState(0)
  const [second, setSecond] = useState(0)
  const [total, setTotal] = useState(0)
  const [answer, setAnswer] = useState(false)
  const [tracks, setTracks] = useState(null)

  const yourVideo = useRef()
  const otherVideo = useRef()
  const audioRef = useRef()

  const dispatch = useDispatch()
  const { auth, call, socket, peer } = useSelector(state => state)

  const openStream = (video) => {
    const config = { audio: true, video }
    return navigator.mediaDevices.getUserMedia(config)
  }

  const playStream = (tag, stream) => {
    let video = tag
    video.srcObject = stream
    video.play()
  }

  const handleAnswer = () => {
    openStream(call.video)
      .then(stream => {
        playStream(yourVideo.current, stream)
        const track = stream.getTracks()
        setTracks(track)

        const newCall = peer.call(call.peerId, stream)
        newCall.on('stream', function(remoteStream) {
          playStream(otherVideo.current, remoteStream)
        })
        setAnswer(true)
      })
  }

  const addCallMessages = useCallback((call, times, disconnect) => {
    if (call.recipient !== auth.user._id || disconnect) {
      const chatData = {
        sender: {
          _id: call.sender,
          name: call.name,
          avatar: call.avatar
        },
        recipient: {
          _id: call.recipient,
          name: call.recipientName,
          avatar: call.recipientAvatar
        },
        text: '',
        media: [],
        audio: '',
        files: [],
        isRead: false,
        call: { video: call.video, times },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      dispatch(createMessage(chatData, auth.token, socket))
    }
  }, [auth, socket, dispatch])

  const handleEndCall = () => {
    if (tracks) {
      tracks.forEach(track => track.stop())
    }
    let times = answer ? total : 0
    socket.emit('endCall', {...call, times})
    addCallMessages(call, times)
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
    setHour(parseInt(total / 3600))
  }, [total])

  useEffect(() => {
    if (answer) {
      setTotal(0)
    } else {
      const timer = setTimeout(() => {
        if (tracks) {
          tracks.forEach(track => track.stop())
        }
        socket.emit('endCall', {...call, times: 0})
        addCallMessages(call, 0)
        dispatch({ type: GLOBAL_TYPES.CALL, payload: null })
      }, 15000)

      return () => clearTimeout(timer)
    }
  }, [dispatch, answer, tracks, addCallMessages, socket, call])

  useEffect(() => {
    socket.on('endCallToClient', data => {
      if (tracks) {
        tracks.forEach(track => track.stop())
      }
      addCallMessages(data, data.times)
      dispatch({ type: GLOBAL_TYPES.CALL, payload: null })
    })

    return () => socket.off('endCallToClient')
  }, [dispatch, socket, tracks, addCallMessages])

  useEffect(() => {
    peer.on('call', newCall => {
      openStream(call.video)
        .then(stream => {
          if (yourVideo.current) {
            playStream(yourVideo.current, stream)
          }

          const track = stream.getTracks()
          setTracks(track)

          newCall.answer(stream)
          newCall.on('stream', function(remoteStream) {
            if (otherVideo.current) {
              playStream(otherVideo.current, remoteStream) 
            }
          })
          setAnswer(true)
        })
    })

    return () => peer.removeListener('call')
  }, [peer, call.video])

  useEffect(() => {
    socket.on('callerDisconnect', () => {
      if (tracks) {
        tracks.forEach(track => track.stop())
      }
      let times = answer ? total : 0
      addCallMessages(call, times, true)
      dispatch({ type: GLOBAL_TYPES.CALL, payload: null })
      dispatch({ type: GLOBAL_TYPES.ALERT, payload: { errors: `${call.name} disconected.` } })
    })

    return () => socket.off('callerDisconnect')
  }, [dispatch, socket, tracks, addCallMessages, answer, call, total])

  useEffect(() => {
    if (answer) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    } else {
      audioRef.current.play()
    }
  }, [answer])

  return (
    <>
      <audio controls ref={audioRef} className='hidden' loop>
        <source src={Ringtone} type='audio/mp3' />
      </audio>
      <div className={`bg-[rgba(0,0,0,.7)] fixed top-0 right-0 bottom-0 left-0 z-[999] p-5 flex items-center justify-center ${answer && call.video ? 'hidden' : 'block'}`}>
        <div className='bg-white w-full max-w-[350px] p-8 flex items-center justify-center flex-col rounded-lg shadow-2xl'>
          <Avatar src={call.avatar} alt={call.name} />
          <h1 className='font-medium text-xl mt-5'>{call.name}</h1>
          {
            !answer &&
            <div className='mt-4 flex items-center gap-2'>
              <p>{hour.toString().length > 1 ? hour : '0' + hour}</p>
              <p>:</p>
              <p>{min.toString().length > 1 ? min : '0' + min}</p>
              <p>:</p>
              <p>{second.toString().length > 1 ? second : '0' + second}</p>
            </div>
          }
          
          {
            answer
            ? (
              <div className='mt-4 flex items-center gap-2'>
                <p>{hour.toString().length > 1 ? hour : '0' + hour}</p>
                <p>:</p>
                <p>{min.toString().length > 1 ? min : '0' + min}</p>
                <p>:</p>
                <p>{second.toString().length > 1 ? second : '0' + second}</p>
              </div>
            )
            : <p className='mt-8'>{call.video ? 'Video Call' : 'Audio Call'}</p>
          }
          <div className='flex items-center mt-8 gap-8'>
            {
              (call.recipient === auth.user?._id && !answer) &&
              <div className='bg-green-500 rounded-full cursor-pointer hover:bg-green-400'>
                {
                  call.video
                  ? <IoIosVideocam className='text-white text-5xl p-3' onClick={handleAnswer} />
                  : <IoIosCall className='text-white text-5xl p-3' onClick={handleAnswer} />
                }
              </div>
            }
            <div className='bg-red-500 rounded-full cursor-pointer hover:bg-red-400'>
              <HiPhoneMissedCall onClick={handleEndCall}className='text-white text-5xl p-3' />
            </div>
          </div>
        </div>
      </div>
      
      <VideoCallModal
        answer={answer}
        call={call}
        yourVideo={yourVideo}
        otherVideo={otherVideo}
        hour={hour}
        min={min}
        second={second}
        handleEndCall={handleEndCall}
      />
    </>
  )
}

export default CallModal