import styles from './ContactItem.module.scss';
import { AiFillDelete } from 'react-icons/ai';
import { GrEdit } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { GrCheckboxSelected, GrCheckbox } from 'react-icons/gr';
import {
  useContact,
  useContactDispatcher,
} from '../../context/contactProvider/contactProvider';
import { useAlert } from '../../context/AlertProvider/AlertProvider';
import Option from '../options/Option';
const ContactItem = ({ contact }) => {
  const dispatch = useContactDispatcher();
  const { isSelectModeOn } = useContact();
  const { dispatchAlert } = useAlert();

  const selectItemHandler = () => {
    dispatch({
      type: 'toggleContactItemSelectionStatus',
      id: contact.id,
    });
  };

  const deleteHandler = () => {
    const helper = () => {
      dispatch({ type: 'deleteContact', id: contact.id });
    };
    dispatchAlert({ mode: 'alertSingleDelete', onUserAcceptation: helper });
  };

  return (
    <li className={styles.liTag}>
      <div className={styles.info}>
        {' '}
        <p className={styles.name}>{contact.name}</p>
        <p className={styles.email}>{contact.email}</p>
      </div>
      <div className={styles.buttons}>
        {isSelectModeOn ? (
          <button onClick={selectItemHandler}>
            {contact.isSelected ? <GrCheckboxSelected /> : <GrCheckbox />}
          </button>
        ) : (
          <Option contact={contact} />
        )}{' '}
      </div>
    </li>
  );
};

export default ContactItem;
