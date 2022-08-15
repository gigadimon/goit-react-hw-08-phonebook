import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import { ContactForm } from 'components/ContactForm';
import { useSelector } from 'react-redux';
import { selectLogin } from 'redux/selectors';

import s from './Phonebook.module.css';

export default function Phonebook() {
  const isLoggedIn = useSelector(selectLogin);

  return (
    <>
      {isLoggedIn && (
        <div className={s.container}>
          <h1>Phonebook</h1>
          <ContactForm />
          <h2>Contacts</h2>
          <Filter />
          <ContactList />
        </div>
      )}
    </>
  );
}
