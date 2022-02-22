import { AiFillFileExcel, AiFillFilePdf, AiFillFilePpt, AiFillFileUnknown, AiFillFileWord, AiFillFileZip, AiOutlineDownload } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { BsCheck2All } from 'react-icons/bs'
import { IoIosVideocam, IoIosCall } from 'react-icons/io'
import { IoVideocamOff } from 'react-icons/io5'
import { HiPhoneMissedCall } from 'react-icons/hi'
import Avatar from './../general/Avatar'

const Message = ({ type, message, sender, recipientAvatar, audio, media, files, timestamp, isRead, call }) => {
  const { auth } = useSelector(state => state)

  return (
    <div className={`mb-7 flex ${type === 'sender' ? 'items-end' : 'items-start'} ${type === 'sender' ? 'justify-end' : 'justify-start'} flex-col`}>
      {
        message &&
        <div className={`flex ${type === 'sender' ? 'flex-row-reverse' : undefined}`}>
          <Avatar src={type === 'sender' ? auth.user?.avatar : recipientAvatar} size='30px' />
            <div className={`max-w-[20rem] w-fit float-right break-all ${type === 'sender' ? 'bg-sky-400' : 'bg-gray-100'} p-3 rounded-md mb-2 ${type === 'sender' ? 'text-white' : undefined} ${type === 'sender' ? 'mr-3' : 'ml-3'} flex items-center gap-2`}>
              {message}
              {
                sender._id === auth.user?._id &&
                (
                  isRead
                  ? <BsCheck2All className='text-blue-500 text-lg' />
                  : <BsCheck2All className='text-gray-300 text-lg' />
                )
              }
            </div>
        </div>
      }
      
      {
        media.length > 0 &&
        <div className={`flex ${type === 'sender' ? 'flex-row-reverse' : undefined}`}>
          {!message && <Avatar src={type === 'sender' ? auth.user?.avatar : recipientAvatar} size='30px' />}
          <div className={`${type === 'sender' ? `${message ? '-translate-x-[50px]' : '-translate-x-3'}` : `${message ? 'translate-x-[50px]' : 'translate-x-3'}`}`}>
            {
              media.map((item, idx) => (
                <div className='relative'>
                  <img key={idx} src={item} alt={idx} className='w-40 h-40 mb-3' />
                  {
                    sender._id === auth.user?._id &&
                    (
                      isRead
                      ? <BsCheck2All className='text-blue-500 text-xl absolute bottom-1 right-2' />
                      : <BsCheck2All className='text-gray-300 text-xl absolute bottom-1 right-2' />
                    )
                  }
                </div>
              ))
            }
          </div>
        </div>
      }

      {
        call &&
        <div className={`flex ${type === 'sender' ? 'flex-row-reverse' : undefined}`}>
          {!message && <Avatar src={type === 'sender' ? auth.user?.avatar : recipientAvatar} size='30px' />}
          <div className={`${type === 'sender' ? `${message ? '-translate-x-[50px]' : '-translate-x-3'}` : `${message ? 'translate-x-[50px]' : 'translate-x-3'}`}`}>
            {
              call.video
              ? (
                <div className='flex items-center gap-6 bg-gray-100 p-3 rounded-md mb-1'>
                  {call.times > 0 ? <IoIosVideocam className='text-2xl text-green-700' /> : <IoVideocamOff className='text-2xl text-red-500' />}
                  {
                    call.times > 0
                    ? (
                      <div className='flex items-center gap-2'>
                        <p>{parseInt(call.times / 3600).toString().length < 2 ? '0' + parseInt(call.times / 3600) : parseInt(call.times / 3600)}</p>
                        <p>:</p>
                        <p>{parseInt(call.times / 60).toString().length < 2 ? '0' + parseInt(call.times/60) : parseInt(call.times / 60)}</p>
                        <p>:</p>
                        <p>{(call.times % 60).toString().length < 2 ? '0' + call.times % 60 : call.times % 60}</p>
                      </div>
                    )
                    : (
                      <p>Missed Video Call</p>
                    )
                  }
                </div>
              )
              : (
                <div className='flex items-center gap-6 bg-gray-100 p-3 rounded-md mb-1'>
                  {call.times > 0 ? <IoIosCall className='text-2xl text-green-700' /> : <HiPhoneMissedCall className='text-2xl text-red-500' />}
                  {
                    call.times > 0
                    ? (
                      <div className='flex items-center gap-2'>
                        <p>{parseInt(call.times / 3600).toString().length < 2 ? '0' + parseInt(call.times / 3600) : parseInt(call.times / 3600)}</p>
                        <p>:</p>
                        <p>{parseInt(call.times / 60).toString().length < 2 ? '0' + parseInt(call.times/60) : parseInt(call.times / 60)}</p>
                        <p>:</p>
                        <p>{(call.times % 60).toString().length < 2 ? '0' + call.times % 60 : call.times % 60}</p>
                      </div>
                    )
                    : (
                      <p>Missed Audio Call</p>
                    )
                  }
                </div>
              )
            }
          </div>
        </div>
      }

      {
        audio &&
        <div className={`flex ${type === 'sender' ? 'flex-row-reverse' : undefined} items-center`}>
          <Avatar src={type === 'sender' ? auth.user?.avatar : recipientAvatar} size='30px' />
          <div className={`${type === 'sender' ? '-translate-x-2' : 'translate-x-2'}`}>
            {
              sender._id === auth.user?._id &&
              (
                isRead
                ? <BsCheck2All className='text-blue-500 text-xl' />
                : <BsCheck2All className='text-gray-300 text-xl' />
              )
            }
          </div>
          <div className={`${type === 'sender' ? `${message ? '-translate-x-[50px]' : '-translate-x-3'}` : `${message ? 'translate-x-[50px]' : 'translate-x-3'}`}`}>
            <audio controls>
              <source src={audio} />
            </audio>
          </div>
        </div>
      }

      {
        files.length > 0 &&
        <div className={`flex ${type === 'sender' ? 'flex-row-reverse' : undefined}`}>
          {!message && <Avatar src={type === 'sender' ? auth.user?.avatar : recipientAvatar} size='30px' />}
          <div className={`${type === 'sender' ? `${message ? '-translate-x-[50px]' : '-translate-x-3'}` : `${message ? 'translate-x-[50px]' : 'translate-x-3'}`}`}>
            {
              files.map((item, idx) => (
                <>
                  {
                    item.split('.')[item.split('.').length - 1] === 'pdf'
                    ? (
                      <div className='flex items-center justify-center border rounded-md border-gray-500 p-3 gap-6 mb-2'>
                        <div className='flex items-center justify-center gap-2'>
                          <AiFillFilePdf className='text-red-500 text-lg' />
                          <p>PDF File</p>
                        </div>
                        <a href={item} alt={idx} target='_blank' rel='noreferrer'>
                          <AiOutlineDownload className='text-lg' />
                        </a>
                        {
                          sender._id === auth.user?._id &&
                          (
                            isRead
                            ? <BsCheck2All className='text-blue-500 text-xl' />
                            : <BsCheck2All className='text-gray-300 text-xl' />
                          )
                        }
                      </div>
                    )
                    : item.split('.')[item.split('.').length - 1].includes('docx', 'doc')
                      ? (
                        <div className='flex items-center justify-center border rounded-md border-gray-500 p-3 gap-6 mb-2'>
                          <div className='flex items-center justify-center gap-2'>
                            <AiFillFileWord className='text-blue-500 text-lg' />
                            <p>Word File</p>
                          </div>
                          <a href={item} alt={idx}>
                            <AiOutlineDownload className='text-lg' />
                          </a>
                          {
                            sender._id === auth.user?._id &&
                            (
                              isRead
                              ? <BsCheck2All className='text-blue-500 text-xl' />
                              : <BsCheck2All className='text-gray-300 text-xl' />
                            )
                          }
                        </div>
                      )
                      : item.split('.')[item.split('.').length - 1].includes('xlsx', 'xls')
                        ? (
                          <div className='flex items-center justify-center border rounded-md border-gray-500 p-3 gap-6 mb-2'>
                            <div className='flex items-center justify-center gap-2'>
                              <AiFillFileExcel className='text-green-500 text-lg' />
                              <p>Excel File</p>
                            </div>
                            <a href={item} alt={idx}>
                              <AiOutlineDownload className='text-lg' />
                            </a>
                            {
                              sender._id === auth.user?._id &&
                              (
                                isRead
                                ? <BsCheck2All className='text-blue-500 text-xl' />
                                : <BsCheck2All className='text-gray-300 text-xl' />
                              )
                            }
                          </div>
                        )
                        : item.split('.')[item.split('.').length - 1].includes('pptx', 'ppt')
                          ? (
                            <div className='flex items-center justify-center border rounded-md border-gray-500 p-3 gap-6 mb-2'>
                              <div className='flex items-center justify-center gap-2'>
                                <AiFillFilePpt className='text-orange-500 text-lg' />
                                <p>Powerpoint File</p>
                              </div>
                              <a href={item} alt={idx}>
                                <AiOutlineDownload className='text-lg' />
                              </a>
                              {
                                sender._id === auth.user?._id &&
                                (
                                  isRead
                                  ? <BsCheck2All className='text-blue-500 text-xl' />
                                  : <BsCheck2All className='text-gray-300 text-xl' />
                                )
                              }
                            </div>
                          )
                          : item.split('.')[item.split('.').length - 1] === 'zip'
                            ? (
                              <div className='flex items-center justify-center border rounded-md border-gray-500 p-3 gap-6 mb-2'>
                                <div className='flex items-center justify-center gap-2'>
                                  <AiFillFileZip className='text-gray-500 text-lg' />
                                  <p>Zip File</p>
                                </div>
                                <a href={item} alt={idx}>
                                  <AiOutlineDownload className='text-lg' />
                                </a>
                                {
                                  sender._id === auth.user?._id &&
                                  (
                                    isRead
                                    ? <BsCheck2All className='text-blue-500 text-xl' />
                                    : <BsCheck2All className='text-gray-300 text-xl' />
                                  )
                                }
                              </div>
                            )
                            : (
                              <div className='flex items-center justify-center border rounded-md border-gray-500 p-3 gap-6 mb-2'>
                                <div className='flex items-center justify-center gap-2'>
                                  <AiFillFileUnknown className='text-gray-500 text-lg' />
                                  <p>Unknown File</p>
                                </div>
                                <a href={item} alt={idx}>
                                  <AiOutlineDownload className='text-lg' />
                                </a>
                                {
                                  sender._id === auth.user?._id &&
                                  (
                                    isRead
                                    ? <BsCheck2All className='text-blue-500 text-xl' />
                                    : <BsCheck2All className='text-gray-300 text-xl' />
                                  )
                                }
                              </div>
                            )
                  }
                </>
              ))
            }
          </div>
        </div>
      }
      
      <p className={`${type === 'sender' ? '-translate-x-[50px]' : 'translate-x-[50px]'} text-gray-400`}>{timestamp}</p>
    </div>
  )
}

export default Message