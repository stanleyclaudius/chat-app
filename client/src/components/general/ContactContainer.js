import ContactCard from './ContactCard'

const ContactContainer = ({ conversation, setSelectContact }) => {
  return (
    <div className='md:h-[83vh] h-[85vh] overflow-auto contact-container'>
      {
        conversation.map(item => (
          <ContactCard
            key={item._id}
            text={item.text}
            user={item.recipients[1]}
            date={item.createdAt}
            setSelectContact={setSelectContact}
          />
        ))
      }
    </div>
  )
}

export default ContactContainer