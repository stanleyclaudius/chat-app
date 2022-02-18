import { AiFillFileExcel, AiFillFilePdf, AiFillFilePpt, AiFillFileUnknown, AiFillFileWord, AiFillFileZip, AiOutlineDownload } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import Avatar from './../general/Avatar'

const Message = ({ type, message, recipientAvatar, audio, media, files, timestamp }) => {
  const { auth } = useSelector(state => state)

  return (
    <div className={`mb-7 flex ${type === 'sender' ? 'items-end' : 'items-start'} ${type === 'sender' ? 'justify-end' : 'justify-start'} flex-col`}>
      {
        message &&
        <div className={`flex ${type === 'sender' ? 'flex-row-reverse' : undefined}`}>
          <Avatar src={type === 'sender' ? auth.user?.avatar : recipientAvatar} size='30px' />
            <div className={`max-w-[20rem] w-fit float-right break-all ${type === 'sender' ? 'bg-[#41AEF3]' : 'bg-gray-100'} p-3 rounded-md mb-2 ${type === 'sender' ? 'text-white' : undefined} ${type === 'sender' ? 'mr-3' : 'ml-3'}`}>
              {message}
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
                <img key={idx} src={item} alt={idx} className='w-40 h-40 mb-3' />
              ))
            }
          </div>
        </div>
      }

      {
        audio &&
        <div className={`flex ${type === 'sender' ? 'flex-row-reverse' : undefined}`}>
          <Avatar src={type === 'sender' ? auth.user?.avatar : recipientAvatar} size='30px' />
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