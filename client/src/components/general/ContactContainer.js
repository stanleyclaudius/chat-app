import { useSelector } from 'react-redux'
import ContactCard from './ContactCard'

const ContactContainer = ({ conversation, setSelectContact }) => {
  const { auth } = useSelector(state => state)

  return (
    <div className='md:h-[83vh] h-[85vh] overflow-auto contact-container'>
      {
        conversation.map((item, idx) => (
          <ContactCard
            key={idx}
            text={item.text}
            user={item.recipients[0]._id === auth.user?._id ? item.recipients[1] : item.recipients[0]}
            date={item.createdAt}
            setSelectContact={setSelectContact}
          />
        ))
      }
    </div>
  )
}

export default ContactContainer