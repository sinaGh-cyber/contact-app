import styles from './ContactList.module.scss';
import { useContact } from '../../context/contactProvider/contactProvider';
import ContactItem from '../ContactItem/ContactItem';
import Loader from '../Loader/Loader';

const ContactList = () => {
  const contacts = useContact();
  return (
    <ul className={`${styles.ulTag} ${contacts.currentStatus !== 'Loaded' && styles.loading}`}>
      {contacts.currentStatus === 'Loaded' ? (
        contacts.filteredContacts.map((contact) => {
          return <ContactItem contact={contact} key={contact.id} />;
        })
      ) : (
        <Loader />
      )}
    </ul>
  );
};

export default ContactList;
