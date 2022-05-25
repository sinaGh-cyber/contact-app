import { useState } from 'react';
import styles from './Option.module.scss';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useContactDispatcher } from '../../context/contactProvider/contactProvider';
import { useAlert } from '../../context/AlertProvider/AlertProvider';
const Option = ({contact}) => {
  const [isOptionsActive, setIsOptionsActive] = useState();
  const {dispatch} = useContactDispatcher();
  const {dispatchAlert} = useAlert()

  const deleteHandler = () => {
    const helper = () => {
      dispatch({ type: 'deleteContact', id: contact.id });
    };
    dispatchAlert({ mode: 'alertSingleDelete', onUserAcceptation: helper });
  };

  return (
    <div className={styles.BtnContainer}>
      {isOptionsActive ? (
        <button>
          <BsThreeDots />
        </button>
      ) : (
        <menu className={styles.menu}>
          <li className={`${styles.menuLi} ${styles.menuLi$$delete}`}>
            <button onClick={deleteHandler} >Delete</button>
          </li>
          <li className={`${styles.menuLi} ${styles.menuLi$$edit}`}>

            <Link to={`/edit/${contact.id}/`}>
            <button>Edit</button>
            </Link>
          </li>
        </menu>
      )}
    </div>
  );
};
export default Option;
