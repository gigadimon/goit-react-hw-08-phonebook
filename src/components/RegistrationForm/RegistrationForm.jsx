import s from './RegistrationForm.module.css';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from 'redux/authSlice';
import { selectLogin } from 'redux/selectors';
import { Button } from '@mui/material';

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectLogin);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error('Fields cannot be empty', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    const formData = { name, email, password };

    console.log(formData);
    dispatch(registerUser(formData));
    reset();
  }

  function reset() {
    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <>
      {!isLoggedIn && (
        <form className={s.form} onSubmit={handleSubmit}>
          <TextField
            sx={{ marginBottom: '10px' }}
            size="small"
            id="outlined-name-input"
            label="Name"
            type="text"
            variant="outlined"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            sx={{ marginBottom: '10px' }}
            size="small"
            id="outlined-email-input"
            label="E-mail"
            type="email"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            sx={{ marginBottom: '10px' }}
            size="small"
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button variant="contained" type="submit">
            Register
          </Button>
        </form>
      )}

      <ToastContainer />
    </>
  );
}
