import styles from './ContactItem.module.scss';
import { BsThreeDots } from 'react-icons/bs';
import { GrCheckboxSelected, GrCheckbox } from 'react-icons/gr';
import {
  useContact,
  useContactDispatcher,
} from '../../context/contactProvider/contactProvider';
import { useAlert } from '../../context/AlertProvider/AlertProvider';
import { useOption } from '../../context/OptionProvider/OptionProvider';
import { useRef } from 'react';
import Option from '../options/Option';
const ContactItem = ({ contact }) => {
  const dispatch = useContactDispatcher();
  const { isSelectModeOn } = useContact();
  const { dispatchAlert } = useAlert();
  const { contactOptionMenu, dispatchOption } = useOption();

  const elemRef = useRef();

  const optionMenuHandler = (e) => {
    const onDelete = () => {
      const helper = async () => {
        await dispatch({ type: 'deleteContact', id: contact.id });
        dispatchOption({ type: 'optionClose' });
      };
      dispatchAlert({ mode: 'alertSingleDelete', onUserAcceptation: helper });
    };
    e.stopPropagation();
    dispatchOption({
      type: 'optionShow',
      onDelete: onDelete,
      isOptionMenuVisible: true,
      elemRef,
      id: contact.id,
    });
  };

  const selectItemHandler = () => {
    dispatch({
      type: 'toggleContactItemSelectionStatus',
      id: contact.id,
    });
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
        ) : contactOptionMenu.isOptionMenuVisible &&
          contactOptionMenu.id === contact.id ? (
          <Option />
        ) : (
          <button ref={elemRef} name="threeDots" onClick={optionMenuHandler}>
            <BsThreeDots />
          </button>
        )}{' '}
      </div>
    </li>
  );
};

export default ContactItem;
