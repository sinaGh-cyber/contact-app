import styles from './ContactItem.module.scss';
import { AiFillDelete } from 'react-icons/ai';
import { GrEdit } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { useContactDispatcher } from '../../context/contactProvider/contactProvider';
const ContactItem = ({ contact }) => {
  const dispatch = useContactDispatcher();

  const deleteHandler = () => {
    dispatch({ type: 'deleteContact', id: contact.id });
  };
  return (
    <li className={styles.liTag}>
      <div className={styles.info}>
        {' '}
        <p className={styles.name}>{contact.name}</p>
        <p className={styles.email}>{contact.email}</p>
      </div>
      <div className={styles.buttons}>
        {' '}
        <button onClick={deleteHandler} className={styles.deleteBtn}>
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
