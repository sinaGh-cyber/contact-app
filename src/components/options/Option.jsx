import styles from './Option.module.scss';
import { Link } from 'react-router-dom';
import { useOption } from '../../context/OptionProvider/OptionProvider';
const Option = () => {
  const { contactOptionMenu, dispatchOption } = useOption();
  return (
    <div className={styles.BtnContainer}>
      <menu className={styles.menu}>

        <li className={`${styles.menuLi} ${styles.menuLidelete}`}>
          <button onClick={contactOptionMenu.onDelete}>حذف</button>
        </li>

        <li className={`${styles.menuLi} ${styles.menuLiEdit}`}>
          <Link to={`/edit/${contactOptionMenu.id}/`}>
            <button
              onClick={() => {
                dispatchOption({ type: 'optionClose' });
              }}
            >
              ویرایش
            </button>
          </Link>
        </li>

      </menu>
    </div>
  );
};
export default Option;
