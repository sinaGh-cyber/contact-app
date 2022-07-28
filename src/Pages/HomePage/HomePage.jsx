import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';
import {
  IoAddOutline,
  IoPersonRemove,
  IoArrowUndo,
  IoCheckmarkDone,
} from 'react-icons/io5';
import { useEffect, useState } from 'react';
import {
  useContact,
  useContactDispatcher,
} from '../../context/contactProvider/contactProvider';
import ContactList from '../../components/ContactList/ContactList';
import { useAlert } from '../../context/AlertProvider/AlertProvider';
import { useTransition } from 'react';

const HomePage = () => {
  const dispatch = useContactDispatcher();
  const { isSelectModeOn, allContacts } = useContact();
  const [isDeleteBtnDisabled, setIsDeleteBtnDisabled] = useState(false);
  const { dispatchAlert } = useAlert();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');
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
    setQuery(e.target.value);

    startTransition(() => {
      dispatch({ type: 'filterContacts', data: e.target.value });
    });
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
            value={query}
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
                {' '}
                <span className={styles.icon}>
                  <IoPersonRemove />
                </span>
              </button>{' '}
              <button
                onClick={selectToggleHandler}
                className={styles.CancelBtn}
              >
                <span className={styles.icon}>
                  <IoArrowUndo />
                </span>
              </button>
            </>
          ) : (
            <button onClick={selectToggleHandler} className={styles.SelectBtn}>
              <span className={styles.icon}>
                <IoCheckmarkDone />
              </span>
            </button>
          )}{' '}
          <Link to={'/add'}>
            <button className={styles.addBtn}>
              <span className={styles.icon}>
                <IoAddOutline />
              </span>
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
