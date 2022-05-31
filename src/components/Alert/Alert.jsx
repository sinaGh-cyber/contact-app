import { useAlert } from '../../context/AlertProvider/AlertProvider';
import styles from './Alert.module.scss';

const Alert = () => {
  const { alert, dispatchAlert } = useAlert();

  const cancelHandler = () => {
    dispatchAlert({ mode: 'alertClose' });
  };

  const dangerHandler = () => {
    alert.onUserAcceptation();
    dispatchAlert({ mode: 'alertClose' });
  };
  const stopPropagation = (e) => e.stopPropagation();

  return (
    <aside
      onClick={cancelHandler}
      className={`${styles.container} ${
        alert.alertIsShown ? styles.visible : styles.hidden
      }`}
    >
      <section onClick={stopPropagation} className={styles.card}>
        <section className={styles.text}>
          {' '}
          <p className={styles.modeMessage}>{alert.alertMessage}</p>
          <p className={styles.question}>آیا مطمعن هستید؟</p>
        </section>
        <section className={styles.buttonGroup}>
          <button
            style={alert.buttonColor}
            onClick={dangerHandler}
            className={styles.dangerBtn}
          >
            {alert.buttonText}
          </button>
          <button onClick={cancelHandler} className={styles.cancelBtn}>
            انصراف
          </button>
        </section>
      </section>
    </aside>
  );
};

export default Alert;
