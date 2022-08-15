import { useState } from 'react';

import { ContactFormMarkup } from './ContactFormMarkup';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactSlice';
import { selectContacts } from 'redux/selectors';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const contactExistsNotify = () =>
  toast.error('This contact is already in your phonebook', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name } = event.currentTarget;
    switch (name) {
      case 'name':
        return setName(event.currentTarget.value);
      case 'number':
        return setNumber(event.currentTarget.value);
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (contacts) {
      if (
        contacts.filter(
          contact => contact.name === name || contact.number === number
        ).length === 0
      ) {
        setIsAdding(true);
        dispatch(
          addContact({
            name,
            number,
          })
        ).finally(() => setIsAdding(false));
      } else {
        contactExistsNotify();
      }
    } else {
      setIsAdding(true);
      dispatch(
        addContact({
          name,
          number,
        })
      ).finally(() => setIsAdding(false));
    }

    reset();
  };

  function reset() {
    setName('');
    setNumber('');
  }
  return (
    <>
      <ContactFormMarkup
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        name={name}
        number={number}
        isAdding={isAdding}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
