import styles from './AddContact.module.scss';
import { Link } from 'react-router-dom';
import { RiContactsBookLine } from 'react-icons/ri';
import { useState } from 'react';
import { useAlert } from '../../context/AlertProvider/AlertProvider';
import { useContactDispatcher } from '../../context/contactProvider/contactProvider';
import { toast } from 'react-toastify';
const AddContact = () => {
  const initStat = {
    data: {
      name: '',
      email: '',
      company: '',
      mobile: '',
    },
    error: {
      name: { isValid: true, errorMessage: 'نام معتبر نیست!' },
      email: { isValid: true, errorMessage: 'ایمیل معتبر نیست!' },
      company: { isValid: true, errorMessage: 'شغل معتبر نیست!' },
      mobile: { isValid: true, errorMessage: 'تلفن همراه معتبر نیست!' },
    },
  };
  const [formInfo, setFormInfo] = useState(initStat);
  const { dispatchAlert } = useAlert();
  const dispatchContact = useContactDispatcher();

  const formValidator = () => {
    const formInfoClone = { ...formInfo };

    const nameData = formInfoClone.data.name;
    const emailData = formInfoClone.data.email;
    const companyData = formInfoClone.data.company;
    const mobileData = formInfoClone.data.mobile;

    const isNameValid =
      !!nameData && nameData.length < 20 && nameData.length > 5;

    const isEmailValid =
      emailData &&
      emailData.match(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
    const isCompanyValid = companyData
      ? companyData.match(/^\D+$/) &&
        companyData.length < 35 &&
        companyData.length > 3
      : true;

    const isMobileValid = mobileData
      ? mobileData.match(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/)
      : true;

    formInfoClone.error.name.isValid = isNameValid;
    formInfoClone.error.email.isValid = isEmailValid;
    formInfoClone.error.company.isValid = isCompanyValid;
    formInfoClone.error.mobile.isValid = isMobileValid;

    setFormInfo(formInfoClone);

    if (isNameValid && isEmailValid && isCompanyValid && isMobileValid) {
      return true;
    }
    return false;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (formValidator()) {
      const onUserAcceptation = () => {
        dispatchContact({ type: 'addContact', data: formInfo.data });
        setFormInfo(initStat);
      };
      dispatchAlert({ mode: 'alertAdd', onUserAcceptation });
    } else {
      toast.error('اطلاعات وارد شده معتبر نیست');
    }
  };

  const onChangeHandler = (e) => {
    const formInfoClone = { ...formInfo };
    formInfoClone.data[e.target.name] = e.target.value;
    setFormInfo(formInfoClone);
    formValidator();
  };

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
      <form onSubmit={onSubmitHandler} className={styles.container}>
        <div className={styles.inputContainer}>
          <div className={`${styles.input} ${styles.name}`}>
            <label htmlFor="name">نام و نام خانوادگی:</label>
            <input
              value={formInfo.data.name}
              onChange={onChangeHandler}
              type="text"
              name="name"
              id="name"
            />
          </div>{' '}
          {!formInfo.error.name.isValid && (
            <p className={styles.error}>{formInfo.error.name.errorMessage}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <div className={`${styles.input} ${styles.email}`}>
            <label htmlFor="email">ایمیل:</label>
            <input
              value={formInfo.data.email}
              onChange={onChangeHandler}
              type="email"
              name="email"
              id="email"
            />
          </div>{' '}
          {!formInfo.error.email.isValid && (
            <p className={styles.error}>{formInfo.error.email.errorMessage}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          {' '}
          <div className={`${styles.input} ${styles.company}`}>
            <label htmlFor="company">شغل:</label>
            <input
              value={formInfo.data.company}
              onChange={onChangeHandler}
              type="text"
              name="company"
              id="company"
            />
          </div>
          {!formInfo.error.company.isValid && (
            <p className={styles.error}>
              {formInfo.error.company.errorMessage}
            </p>
          )}
        </div>

        <div className={`${styles.inputContainer} ${styles.mobile}`}>
          <div className={`${styles.input} ${styles.mobile}`}>
            <label htmlFor="mobile">تلفن همراه:</label>
            <input
              value={formInfo.data.mobile}
              onChange={onChangeHandler}
              type="tel"
              name="mobile"
              id="mobile"
            />
          </div>{' '}
          {!formInfo.error.mobile.isValid && (
            <p className={styles.error}>{formInfo.error.mobile.errorMessage}</p>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit">افزودن</button>
        </div>
      </form>
    </>
  );
};

export default AddContact;
