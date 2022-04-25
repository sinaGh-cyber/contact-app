import styles from './ContactItem.module.scss';
import { AiFillDelete } from 'react-icons/ai';
import { GrEdit } from 'react-icons/gr';
import { Link } from 'react-router-dom';
const ContactItem = ({ contact }) => {
  return (
    <li className={styles.liTag}>
      <div className={styles.info}>
        <p className={styles.email}>{contact.email}</p>
        <p className={styles.name}>{contact.name}</p>
      </div>
      <div className={styles.buttons}>
        {' '}
        <button className={styles.deleteBtn}>
          <AiFillDelete />
        </button>
        <Link to={`/edit/${contact.id}/`}>
          <button className={styles.editBtn}>
            <GrEdit />
          </button>
        </Link>
      </div>
    </li>
  );
};

export default ContactItem;
