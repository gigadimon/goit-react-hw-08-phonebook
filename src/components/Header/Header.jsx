import { NavLink, Outlet } from 'react-router-dom';
import { UserMenu } from 'components/UserMenu';
import { AuthMenu } from 'components/AuthMenu';

import s from './Header.module.css';
import { useSelector } from 'react-redux';
import { selectLogin } from 'redux/selectors';

export default function Header() {
  const isLoggedIn = useSelector(selectLogin);
  return (
    <>
      <header className={s.header}>
        <NavLink to="/" className={s.link}>
          Home
        </NavLink>
        {isLoggedIn ? <UserMenu /> : <AuthMenu />}
      </header>

      <Outlet />
    </>
  );
}
