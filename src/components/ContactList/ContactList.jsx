import ContactListItem from 'components/ContactListItem';
import s from './ContactList.module.css';

import { getContacts } from 'redux/contactSlice';
import {
  selectContacts,
  selectLogin,
  selectToken,
  selectFilter,
} from 'redux/selectors';

import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useEffect } from 'react';
import axios from 'axios';

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectLogin);

  useEffect(() => {
    if (!axios.defaults.headers.common['Authorization'] && token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  useEffect(() => {
    isLoggedIn && !contacts.length && dispatch(getContacts());
  }, [dispatch, isLoggedIn, contacts]);

  return (
    <>
      <ul className={s.contactList}>
        {contacts &&
          (filter
            ? contacts
                .filter(({ name }) =>
                  name.toLowerCase().includes(filter.toLowerCase())
                )
                .map(({ name, number, id }) => (
                  <ContactListItem
                    name={name}
                    number={number}
                    key={id}
                    id={id}
                  />
                ))
            : contacts.map(({ name, number, id }) => (
                <ContactListItem name={name} number={number} key={id} id={id} />
              )))}
      </ul>
    </>
  );
}
