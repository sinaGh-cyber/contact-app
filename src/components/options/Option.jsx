import { useState } from 'react';
import styles from './Option.module.scss';
import { BsThreeDots } from 'react-icons/bs';
const Option = () => {
  const [isOptionsActive, setIsOptionsActive] = useState();
  return (
    <div className={styles.BtnContainer}>
      {isOptionsActive ? (
        <button>
          <BsThreeDots />
        </button>
      ) : (
        <menu>
            <li><button>Delete</button></li>
            <li><button>Edit</button></li>
        </menu>
      )}
    </div>
  );
};

export default Option;
