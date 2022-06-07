import styles from './ContactForm.module.scss';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { RiContactsBookLine } from 'react-icons/ri';
import { useFormik } from 'formik';

const ContactForm = ({ submitButtonText, onSubmit, preFiledValue }) => {
  const initialValues = {
    name: '',
    email: '',
    company: '',
    mobile: '',
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    name: Yup.string('تنها محتوای متنی مجاز است.')
      .min(7, 'لطفا حداقل 7 کاراکتر وارد کنید.')
      .max(30, 'حداکثر می توانید 30 کاراکتر وارد کنید.')
      .required('لطفا نام مخاطب را وارد کنید.'),
    email: Yup.string('تنها محتوای متنی مجاز است.')
      .email('یک ایمیل معتر وار کنید.')
      .required('لطفا ایمیل مخاطب را وارد کنید.'),
    company: Yup.string('تنها محتوای متنی مجاز است.').max(
      30,
      'حداکثر می توانید 30 کاراکتر وارد کنید.'
    ),
    mobile: Yup.string().matches(phoneRegExp, 'شماره معتبر وارد کنید.'),
  });

  const formik = useFormik({
    initialValues: preFiledValue || initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
  });

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
      <form onSubmit={formik.handleSubmit} className={styles.container}>
        <div className={styles.inputContainer}>
          <div className={`${styles.input} ${styles.name}`}>
            <label htmlFor="name">نام و نام خانوادگی:</label>
            <input
            className={`${formik.errors.name && formik.touched.name && styles.error}`}
              {...formik.getFieldProps('name')}
              type="text"
              name="name"
              id="name"
            />
          </div>{' '}
          {formik.errors.name && formik.touched.name && (
            <p className={styles.error}>{formik.errors.name}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <div className={`${styles.input} ${styles.email}`}>
            <label htmlFor="email">ایمیل:</label>
            <input
            className={`${formik.errors.email && formik.touched.email && styles.error}`}
              {...formik.getFieldProps('email')}
              type="email"
              name="email"
              id="email"
            />
          </div>{' '}
          {formik.errors.email && formik.touched.email && (
            <p className={styles.error}>{formik.errors.email}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          {' '}
          <div className={`${styles.input} ${styles.company}`}>
            <label htmlFor="company">شغل:</label>
            <input
            className={`${formik.errors.company && formik.touched.company && styles.error}`}
              {...formik.getFieldProps('company')}
              type="text"
              name="company"
              id="company"
            />
          </div>
          {formik.errors.company && formik.touched.company && (
            <p className={styles.error}>{formik.errors.company}</p>
          )}
        </div>

        <div className={`${styles.inputContainer} ${styles.mobile}`}>
          <div className={`${styles.input} ${styles.mobile}`}>
            <label htmlFor="mobile">تلفن همراه:</label>
            <input
            className={`${formik.errors.mobile && formik.touched.mobile && styles.error}`}
              {...formik.getFieldProps('mobile')}
              type="tel"
              name="mobile"
              id="mobile"
            />
          </div>{' '}
          {formik.errors.mobile && formik.touched.mobile && (
            <p className={styles.error}>{formik.errors.mobile}</p>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button disabled={!formik.isValid} type="submit">
            {submitButtonText}
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
