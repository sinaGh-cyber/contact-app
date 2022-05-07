import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';
import { FaPlusCircle } from 'react-icons/fa';
import { BiSelectMultiple, BiUndo } from 'react-icons/bi';
import { CgUserRemove } from 'react-icons/cg';
import { useEffect, useState } from 'react';
import {
  useContact,
  useContactDispatcher,
} from '../../context/contactProvider/contactProvider';
import ContactList from '../../components/ContactList/ContactList';
import { useAlert } from '../../context/AlertProvider/AlertProvider';

const HomePage = () => {
  const dispatch = useContactDispatcher();
  const { isSelectModeOn, filterWord, allContacts } = useContact();
  const [isDeleteBtnDisabled, setIsDeleteBtnDisabled] = useState(false);
  const { dispatchAlert } = useAlert();

  useEffect(() => {
    dispatch({ type: 'getData' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    allContacts.some((contact) => !!contact.isSelected)
      ? setIsDeleteBtnDisabled(false)
      : setIsDeleteBtnDisabled(true);
  }, [allContacts]);

  const searchHandler = (e) => {
    dispatch({ type: 'filterContacts', data: e.target.value });
  };

  const selectToggleHandler = () => {
    dispatch({ type: 'toggleSelectMode' });
  };

  const deleteHandler = () => {
    const helper = async () => {
      await dispatch({ type: 'groupDelete' });
      await dispatch({ type: 'getData' });
    };

    dispatchAlert({ mode: 'alertGroupDelete', onUserAcceptation: helper });
  };

  return (
    <>
      <section className={styles.navTag}>
        <section className={styles.searchBar}>
          <label htmlFor="search">جستجو در مخاطبین: </label>
          <input
            value={filterWord}
            onChange={searchHandler}
            placeholder="جستجو..."
            type="text"
            name="search"
            id="search"
          />
        </section>
        <section className={styles.buttonGroup}>
          {isSelectModeOn ? (
            <>
              <button
                disabled={isDeleteBtnDisabled}
                onClick={deleteHandler}
                className={styles.DeleteBtn}
              >
                <CgUserRemove />
              </button>{' '}
              <button
                onClick={selectToggleHandler}
                className={styles.CancelBtn}
              >
                <BiUndo />
              </button>
            </>
          ) : (
            <button onClick={selectToggleHandler} className={styles.SelectBtn}>
              <BiSelectMultiple />
            </button>
          )}{' '}
          <Link to={'/add'}>
            <button className={styles.addBtn}>
              <FaPlusCircle />
            </button>
          </Link>
        </section>
      </section>
      <article className={styles.listContainer}>
        <ContactList />
      </article>
    </>
  );
};

export default HomePage;
