import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';
import { FaPlusCircle } from 'react-icons/fa';
import { BiSelectMultiple, BiUndo } from 'react-icons/bi';
import { CgUserRemove } from 'react-icons/cg';
import { useEffect } from 'react';
import {
  useContact,
  useContactDispatcher,
} from '../../context/contactProvider/contactProvider';
import ContactList from '../../components/ContactList/ContactList';

const HomePage = () => {
  const dispatch = useContactDispatcher();
  const { isSelectModeOn } = useContact();
  useEffect(() => {
    dispatch({ type: 'getData' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectToggleHandler = () => {
    dispatch({ type: 'toggleSelectMode' });
  };

  return (
    <>
      <section className={styles.navTag}>
        <section className={styles.searchBar}></section>
        <section className={styles.buttonGroup}>
          {isSelectModeOn ? (
            <>
              <button
                onClick={async () => {
                  await dispatch({ type: 'groupDelete' });
                  await dispatch({ type: 'getData' });
                }}
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
