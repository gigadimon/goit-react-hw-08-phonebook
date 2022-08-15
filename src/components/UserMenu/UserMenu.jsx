import { useDispatch, useSelector } from 'react-redux';
import { clearContacts } from 'redux/contactSlice';
import { logOutUser } from 'redux/authSlice';
import { selectToken, selectUser } from 'redux/selectors';

import { Button } from '@mui/material';
import axios from 'axios';

import s from './UserMenu.module.css';
import { NavLink } from 'react-router-dom';

export function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  function handleClick() {
    if (!axios.defaults.headers.common['Authorization'] && token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    dispatch(logOutUser()).finally(() => dispatch(clearContacts()));
  }

  return (
    <>
      <NavLink to="contacts" className={s.link}>
        Contacts
      </NavLink>
      <div className={s.userMenuContainer}>
        <span className={s.email}>{user.email}</span>
        <Button size="small" onClick={handleClick} variant="outlined">
          Log Out
        </Button>
      </div>
    </>
  );
}
