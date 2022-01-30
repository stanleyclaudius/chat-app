import ContactCard from './ContactCard'

const ContactContainer = ({ setSelectContact }) => {
  return (
    <div className='md:h-[70vh] h-[73vh] overflow-auto contact-container'>
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