import s from './AuthMenu.module.css';
import { NavLink } from 'react-router-dom';

export default function AuthMenu() {
  return (
    <div className={s.authContainer}>
      <NavLink to="register" className={s.link}>
        Registration
      </NavLink>
      <NavLink to="login" className={s.link}>
        Log In
      </NavLink>
    </div>
  );
}
