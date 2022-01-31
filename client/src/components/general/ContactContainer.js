import ContactCard from './ContactCard'

const ContactContainer = ({ setSelectContact }) => {
  return (
    <div className='md:h-[83vh] h-[85vh] overflow-auto contact-container'>
      <ContactCard setSelectContact={setSelectContact} />
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
    </div>
  )
}

export default ContactContainer