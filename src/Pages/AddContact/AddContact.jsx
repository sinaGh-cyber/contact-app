import styles from './AddContact.module.scss';
import { Link } from 'react-router-dom';
import { RiContactsBookLine } from 'react-icons/ri';
const AddContact = () => {
  return (
    <>
      <nav>
        <Link to={'/'}>
          <button>
            <span>
              <RiContactsBookLine />
            </span>
          </button>
        </Link>
      </nav>
      <form className={styles.container}>
        <div className={`${styles.input} ${styles.name}`}>
          <label htmlFor="name">نام و نام خانوادگی:</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className={`${styles.input} ${styles.email}`}>
          <label htmlFor="email">ایمیل:</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className={`${styles.input} ${styles.company}`}>
          <label htmlFor="company">شغل:</label>
          <input type="text" name="company" id="company" />
        </div>
        <div className={`${styles.input} ${styles.mobile}`}>
          <label htmlFor="mobile">تلفن همراه:</label>
          <input type="tel" name="mobile" id="mobile" />
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit">افزودن</button>
        </div>
      </form>
    </>
  );
};

export default AddContact;
