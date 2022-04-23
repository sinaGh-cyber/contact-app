import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';
import { FaPlusCircle } from 'react-icons/fa';
import { useEffect } from 'react';
import { useContactDispatcher } from '../../context/contactProvider/contactProvider';
import ContactList from '../../components/ContactList/ContactList';

const HomePage = () => {
  const dispatch = useContactDispatcher();
  useEffect(() => {
    (async () => {
      await dispatch({ type: 'LoadingMode' });
      await dispatch({ type: 'getData' });
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className={styles.homeContainer}>
      <article className={styles.addLink}>
        <Link to={'/add'}>
          <button className={styles.addBtn}>
            <FaPlusCircle />
          </button>
        </Link>
      </article>
      <article className={styles.listContainer}>
        <ContactList />
      </article>
    </section>
  );
};

export default HomePage;
