import styles from './NotFound.module.scss';
import { Link } from "react-router-dom";

const NotFound = () => {
    return ( <section className={styles.container} >
        <h1>صفحه ی مورد نظر یافت نشد!</h1>
        <h2>404</h2>
        <Link to={'/'} >بازگشت به لیست مخاطبان</Link>
    </section> );
}
 
export default NotFound;