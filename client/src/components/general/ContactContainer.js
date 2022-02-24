import { useSelector } from 'react-redux'
import ContactCard from './ContactCard'

const ContactContainer = ({ conversation, selectContact, setSelectContact }) => {
  const { auth, status } = useSelector(state => state)

  return (
    <div className='md:h-[83vh] h-[85vh] overflow-auto contact-container'>
      {
        conversation.length > 0
        ? (
          <>
            {
              conversation.map((item, idx) => (
                <ContactCard
                  key={idx}
                  text={item.text}
                  media={item.media}
                  audio={item.audio}
                  files={item.files}
                  user={item.recipients[0]._id === auth.user?._id ? item.recipients[1] : item.recipients[0]}
                  recipients={item.recipients}
                  isOnline={status.find(user => (user === item.recipients[0]._id) || (user === item.recipients[1]._id))}
                  date={item.updatedAt}
                  selectContact={selectContact}
                  totalUnread={item.totalUnread}
                  call={item.call}
                  setSelectContact={setSelectContact}
                />
              ))
            }
          </>
        )
        : (
          <div className='p-5'>
            <p className='p-3 bg-red-500 text-white rounded-md'>No Conversation Found</p>
          </div>
        )
      }
    </div>
  )
}

export default ContactContainer