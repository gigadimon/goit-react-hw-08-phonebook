import { NavLink, Outlet } from 'react-router-dom';
import { UserMenu } from 'components/UserMenu';
import { AuthMenu } from 'components/AuthMenu';
import { BASE_URL } from 'components/App';

import s from './Header.module.css';
import { useSelector } from 'react-redux';
import { selectLogin } from 'redux/selectors';

export default function Header() {
  const isLoggedIn = useSelector(selectLogin);
  return (
    <>
      <header className={s.header}>
        <NavLink to={`${BASE_URL}/`} className={s.link}>
          Home
        </NavLink>
        {isLoggedIn ? <UserMenu /> : <AuthMenu />}
      </header>

      <Outlet />
    </>
  );
}
