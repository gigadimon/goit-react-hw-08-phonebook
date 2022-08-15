import { Link } from 'react-router-dom';
import s from './HomePage.module.css';
import { selectLogin } from 'redux/selectors';
import { useSelector } from 'react-redux';

export default function HomePage() {
  const isLoggedIn = useSelector(selectLogin);
  return (
    <section className={s.container}>
      {isLoggedIn ? (
        <p className={s.text}>Save your contacts easily</p>
      ) : (
        <p className={s.text}>
          <Link to="register" className={s.link}>
            Register
          </Link>{' '}
          or{' '}
          <Link to="login" className={s.link}>
            log in
          </Link>{' '}
          to save your contacts
        </p>
      )}
    </section>
  );
}
