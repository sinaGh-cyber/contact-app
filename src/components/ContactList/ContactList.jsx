import styles from './ContactList.module.scss';
import {
  useContact
} from '../../context/contactProvider/contactProvider';
import ContactItem from '../ContactItem/ContactItem';

const ContactList = () => {
  const contacts = useContact();
  return (
    <ul className={styles.ulTag}>
      {contacts.currentStatus === 'Loaded' ? (
        
          contacts.filteredContacts.map((contact) => {
            return <ContactItem contact={contact} key={contact.id} />;
          })
        
      ): 'Loading...'}
    </ul>
  );
};

export default ContactList;
